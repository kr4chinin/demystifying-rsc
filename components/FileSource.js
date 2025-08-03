import fs from 'fs';
import path from 'path';

// Try to load embedded sources
let embeddedSources = null;
try {
  const embeddedPath = path.join(process.cwd(), 'app/embedded-sources.json');
  if (fs.existsSync(embeddedPath)) {
    embeddedSources = JSON.parse(fs.readFileSync(embeddedPath, 'utf-8'));
  }
} catch (e) {
  // Embedded sources not available
}

export default function({filepath,title,children}) {
  try {
    let source = children;
    if (!source) {
      // Check if we're in production (Vercel deployment)
      const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
      
      if (isProduction && embeddedSources && embeddedSources[filepath]) {
        // Use embedded sources in production
        source = embeddedSources[filepath];
      } else {
        // Try to read from filesystem (works in development)
        try {
          source = fs.readFileSync(path.join(process.cwd(), filepath), 'utf-8');
        } catch (fsError) {
          // If filesystem read fails, try embedded sources as fallback
          if (embeddedSources && embeddedSources[filepath]) {
            source = embeddedSources[filepath];
          } else {
            throw fsError;
          }
        }
      }
    }
    return <>
      {title ? <span className={"file-source-title"}>{title}</span> : ''}
      <pre className={"code"}>{source}</pre>
    </>
  } catch(e) {
    return <pre className={"code"}>Error loading {path.join(process.cwd(), filepath)}</pre>
  }
}
