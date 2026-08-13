import http.server
import socketserver
import urllib.request
import urllib.parse
import os
import sqlite3
import json
import hashlib

PORT = 8085
DB_PATH = 'guardiao.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS profiles (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            password_hash TEXT,
            coins INTEGER DEFAULT 20,
            gems INTEGER DEFAULT 5,
            xp INTEGER DEFAULT 0,
            level INTEGER DEFAULT 1,
            active_mascot TEXT DEFAULT 'aranha',
            unlocked_mascots TEXT DEFAULT '["aranha"]',
            profile_photo TEXT,
            photo_gallery TEXT DEFAULT '[]',
            stars TEXT DEFAULT '{}',
            stats TEXT DEFAULT '{}',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS question_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            profile_id TEXT,
            profile_name TEXT,
            category_id TEXT,
            question_text TEXT,
            user_answer TEXT,
            is_correct INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT
        );
    ''')
    conn.commit()
    
    # Se o PIN Mestre não existir, define '1234'
    cursor.execute("INSERT OR IGNORE INTO settings (key, value) VALUES ('master_pin', '1234')")
    
    # Se a tabela estiver vazia, cria o perfil inicial 'pedro'
    cursor.execute("SELECT COUNT(*) as count FROM profiles")
    if cursor.fetchone()['count'] == 0:
        cursor.execute('''
            INSERT INTO profiles (id, name, password_hash, coins, gems, xp, level, active_mascot, unlocked_mascots)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', ('pedro', 'Pedro', '', 20, 5, 0, 1, 'aranha', '["aranha"]'))
        conn.commit()
    conn.close()

def hash_password(password):
    if not password:
        return ''
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def send_json(self, data, status=200):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_cors_headers()
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        if parsed.path == '/api/tts':
            query = urllib.parse.parse_qs(parsed.query)
            q = query.get('q', [''])[0]
            if not q:
                self.send_error(400, "Parâmetro 'q' ausente")
                return
            
            tts_url = f"https://translate.google.com/translate_tts?ie=UTF-8&q={urllib.parse.quote(q)}&tl=pt-BR&client=tw-ob"
            try:
                req = urllib.request.Request(
                    tts_url, 
                    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
                )
                with urllib.request.urlopen(req) as response:
                    audio_data = response.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'audio/mpeg')
                    self.send_header('Content-Length', str(len(audio_data)))
                    self.send_cors_headers()
                    self.send_header('Cache-Control', 'public, max-age=86400')
                    self.end_headers()
                    self.wfile.write(audio_data)
                    return
            except Exception as e:
                print(f"Erro ao buscar TTS para '{q}':", e)
                self.send_error(500, f"Erro TTS: {e}")
                return

        elif parsed.path == '/api/profiles':
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute("SELECT id, name, coins, gems, xp, level, active_mascot, profile_photo, password_hash FROM profiles ORDER BY updated_at DESC")
                rows = cursor.fetchall()
                conn.close()

                profiles = []
                for row in rows:
                    profiles.append({
                        'id': row['id'],
                        'name': row['name'],
                        'coins': row['coins'],
                        'gems': row['gems'],
                        'xp': row['xp'],
                        'level': row['level'],
                        'activeMascot': row['active_mascot'],
                        'profilePhoto': row['profile_photo'],
                        'hasPassword': bool(row['password_hash'])
                    })

                self.send_json({'success': True, 'profiles': profiles})
                return
            except Exception as e:
                print("Erro ao listar perfis:", e)
                self.send_json({'success': False, 'message': str(e)}, 500)
                return

        else:
            return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        body_bytes = self.rfile.read(content_length)
        
        try:
            payload = json.loads(body_bytes.decode('utf-8')) if body_bytes else {}
        except Exception:
            payload = {}

        if parsed.path == '/api/profiles/create':
            name = (payload.get('name') or '').strip() or 'Novo Jogador'
            password = payload.get('password') or ''
            pwd_hash = hash_password(password)
            profile_id = f"profile_{int(urllib.parse.time.time() * 1000)}" if hasattr(urllib.parse, 'time') else f"profile_{os.urandom(6).hex()}"

            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO profiles (id, name, password_hash, coins, gems, xp, level, active_mascot, unlocked_mascots, photo_gallery, stars, stats)
                    VALUES (?, ?, ?, 20, 5, 0, 1, 'aranha', '["aranha"]', '[]', '{}', '{}')
                ''', (profile_id, name, pwd_hash))
                conn.commit()
                conn.close()

                self.send_json({
                    'success': True,
                    'profile': {
                        'id': profile_id,
                        'name': name,
                        'coins': 20,
                        'gems': 5,
                        'xp': 0,
                        'level': 1,
                        'activeMascot': 'aranha',
                        'unlockedMascots': ['aranha'],
                        'profilePhoto': None,
                        'photoGallery': [],
                        'stars': {},
                        'stats': {}
                    }
                })
                return
            except Exception as e:
                print("Erro ao criar perfil no SQLite:", e)
                self.send_json({'success': False, 'message': str(e)}, 500)
                return

        elif parsed.path == '/api/profiles/login':
            profile_id = payload.get('id')
            input_pwd = payload.get('password') or ''
            input_hash = hash_password(input_pwd)

            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM profiles WHERE id = ?", (profile_id,))
                row = cursor.fetchone()
                conn.close()

                if not row:
                    self.send_json({'success': False, 'message': 'Perfil não encontrado!'}, 404)
                    return

                stored_hash = row['password_hash'] or ''

                # Se já tem senha cadastrada e o hash não confere
                if stored_hash and stored_hash != input_hash:
                    self.send_json({'success': False, 'message': 'Senha incorreta!'}, 401)
                    return

                profile_data = {
                    'id': row['id'],
                    'name': row['name'],
                    'coins': row['coins'],
                    'gems': row['gems'],
                    'xp': row['xp'],
                    'level': row['level'],
                    'activeMascot': row['active_mascot'],
                    'unlockedMascots': json.loads(row['unlocked_mascots'] or '["aranha"]'),
                    'profilePhoto': row['profile_photo'],
                    'photoGallery': json.loads(row['photo_gallery'] or '[]'),
                    'stars': json.loads(row['stars'] or '{}'),
                    'stats': json.loads(row['stats'] or '{}')
                }

                self.send_json({'success': True, 'profile': profile_data})
                return
            except Exception as e:
                print("Erro no login no SQLite:", e)
                self.send_json({'success': False, 'message': str(e)}, 500)
                return

        elif parsed.path == '/api/profiles/save':
            profile_id = payload.get('id')
            if not profile_id:
                self.send_json({'success': False, 'message': 'ID do perfil não informado'}, 400)
                return

            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute('''
                    UPDATE profiles SET
                        coins = ?,
                        gems = ?,
                        xp = ?,
                        level = ?,
                        active_mascot = ?,
                        unlocked_mascots = ?,
                        profile_photo = ?,
                        photo_gallery = ?,
                        stars = ?,
                        stats = ?,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?
                ''', (
                    payload.get('coins', 20),
                    payload.get('gems', 5),
                    payload.get('xp', 0),
                    payload.get('level', 1),
                    payload.get('activeMascot', 'aranha'),
                    json.dumps(payload.get('unlockedMascots', ['aranha'])),
                    payload.get('profilePhoto'),
                    json.dumps(payload.get('photoGallery', [])),
                    json.dumps(payload.get('stars', {})),
                    json.dumps(payload.get('stats', {})),
                    profile_id
                ))
                conn.commit()
                conn.close()

                self.send_json({'success': True, 'message': 'Progresso salvo no banco de dados com sucesso!'})
                return
            except Exception as e:
                print("Erro ao salvar progresso no SQLite:", e)
                self.send_json({'success': False, 'message': str(e)}, 500)
                return

        elif parsed.path == '/api/profiles/reset-password':
            profile_id = payload.get('id')
            new_pwd = payload.get('newPassword') or ''
            new_hash = hash_password(new_pwd)

            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute("UPDATE profiles SET password_hash = ? WHERE id = ?", (new_hash, profile_id))
                conn.commit()
                conn.close()

                self.send_json({'success': True, 'message': 'Senha redefinida com sucesso no banco de dados!'})
                return
            except Exception as e:
                print("Erro ao redefinir senha no SQLite:", e)
                self.send_json({'success': False, 'message': str(e)}, 500)
                return

        elif parsed.path == '/api/logs/add':
            profile_id = payload.get('profileId')
            profile_name = payload.get('profileName')
            cat_id = payload.get('categoryId')
            q_text = payload.get('questionText')
            user_ans = payload.get('userAnswer')
            is_corr = 1 if payload.get('isCorrect') else 0

            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT INTO question_logs (profile_id, profile_name, category_id, question_text, user_answer, is_correct)
                    VALUES (?, ?, ?, ?, ?, ?)
                ''', (profile_id, profile_name, cat_id, q_text, user_ans, is_corr))
                conn.commit()
                conn.close()
                self.send_json({'success': True})
                return
            except Exception as e:
                self.send_json({'success': False, 'error': str(e)}, 500)
                return

        elif parsed.path == '/api/profiles/delete':
            profile_id = payload.get('id')
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute("DELETE FROM profiles WHERE id = ?", (profile_id,))
                conn.commit()
                conn.close()
                self.send_json({'success': True, 'message': 'Perfil excluído do banco de dados SQLite com sucesso!'})
                return
            except Exception as e:
                print("Erro ao excluir perfil no SQLite:", e)
                self.send_json({'success': False, 'message': str(e)}, 500)
                return

        elif parsed.path == '/api/admin/get-pin':
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute("SELECT value FROM settings WHERE key = 'master_pin'")
                row = cursor.fetchone()
                conn.close()
                pin = row['value'] if row else '1234'
                self.send_json({'success': True, 'pin': pin})
                return
            except Exception as e:
                self.send_json({'success': False, 'pin': '1234'})
                return

        elif parsed.path == '/api/admin/set-pin':
            new_pin = (payload.get('pin') or '').strip()
            if not new_pin or len(new_pin) < 4:
                self.send_json({'success': False, 'message': 'PIN Mestre inválido'}, 400)
                return
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('master_pin', ?)", (new_pin,))
                conn.commit()
                conn.close()
                self.send_json({'success': True, 'message': 'PIN Mestre atualizado com sucesso no banco!'})
                return
            except Exception as e:
                self.send_json({'success': False, 'message': str(e)}, 500)
                return

        elif parsed.path == '/api/admin/db-dump':
            try:
                conn = get_db_connection()
                cursor = conn.cursor()
                cursor.execute("SELECT id, name, coins, gems, level, active_mascot, updated_at FROM profiles")
                profiles = [dict(row) for row in cursor.fetchall()]

                cursor.execute("SELECT * FROM question_logs ORDER BY id DESC LIMIT 100")
                logs = [dict(row) for row in cursor.fetchall()]
                conn.close()

                self.send_json({'success': True, 'profiles': profiles, 'logs': logs})
                return
            except Exception as e:
                self.send_json({'success': False, 'error': str(e)}, 500)
                return

        else:
            self.send_error(440, "Rota não encontrada")

if __name__ == '__main__':
    import time
    urllib.parse.time = time
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    init_db()
    print(f"🔥 Servidor com Banco de Dados SQLite (guardiao.db) rodando em http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor encerrado.")
