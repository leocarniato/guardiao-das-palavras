import http.server
import socketserver
import urllib.request
import urllib.parse
import os

PORT = 8085

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/tts':
            query = urllib.parse.parse_qs(parsed.query)
            q = query.get('q', [''])[0]
            if not q:
                self.send_error(400, "Parâmetro 'q' ausente")
                return
            
            # Requisita o áudio diretamente do Google Tradutor TTS pelo servidor Python (sem restrições de Referer/CORS do navegador)
            tts_url = f"https://translate.google.com/translate_tts?ie=UTF-8&q={urllib.parse.quote(q)}&tl=pt-BR&client=gtx"
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
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header('Cache-Control', 'public, max-age=86400')
                    self.end_headers()
                    self.wfile.write(audio_data)
                    return
            except Exception as e:
                print(f"Erro ao buscar TTS para '{q}':", e)
                self.send_error(500, f"Erro TTS: {e}")
                return
        else:
            return super().do_GET()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print(f"Servidor do Guardiao das Palavras rodando em http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor encerrado.")
