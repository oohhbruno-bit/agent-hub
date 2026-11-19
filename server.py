#!/usr/bin/env python3
"""
Simple HTTP Server for Agent Hub
Run: python server.py
Then open: http://localhost:8080
"""
import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = 8888
DIRECTORY = Path(__file__).parent

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def guess_type(self, path):
        # Override to ensure UTF-8 charset
        mimetype = super().guess_type(path)
        if path.endswith('.js'):
            return 'application/javascript; charset=utf-8'
        elif path.endswith('.css'):
            return 'text/css; charset=utf-8'
        elif path.endswith('.html'):
            return 'text/html; charset=utf-8'
        return mimetype

    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def log_message(self, format, *args):
        # Cleaner logging
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

if __name__ == '__main__':
    os.chdir(DIRECTORY)

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n🤖 Agent Hub Server")
        print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print(f"📂 Serving: {DIRECTORY}")
        print(f"🌐 URL: http://localhost:{PORT}")
        print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")
            sys.exit(0)