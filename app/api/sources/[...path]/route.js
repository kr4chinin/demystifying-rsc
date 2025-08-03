import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const filePath = params.path.join('/');
    const fullPath = path.join(process.cwd(), filePath);
    
    // Security check - only allow reading from app directory
    if (!fullPath.startsWith(path.join(process.cwd(), 'app'))) {
      return new Response('Access denied', { status: 403 });
    }
    
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      return new Response(content, {
        headers: { 'Content-Type': 'text/plain' }
      });
    } else {
      return new Response('File not found', { status: 404 });
    }
  } catch (error) {
    return new Response('Error reading file', { status: 500 });
  }
} 