import os

def generate_summary(root_dir, output_file):
    with open(output_file, 'w', encoding='utf-8') as out:
        for dirpath, _, filenames in os.walk(root_dir):
            if '.git' in dirpath or '.vscode' in dirpath or '.pio' in dirpath or '__pycache__' in dirpath or 'node_modules' in dirpath or '.idea' in dirpath:
                continue
            
            # Print the directory
            out.write(f"\n{'='*40}\n")
            out.write(f"Directory: {dirpath}\n")
            out.write(f"{'='*40}\n")
            
            for file in filenames:
                if file.endswith(('.ino', '.cpp', '.c', '.h', '.py', '.js', '.css', '.html')):
                    filepath = os.path.join(dirpath, file)
                    out.write(f"\n--- File: {file} ---\n")
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            content = f.read()
                            # truncate if too long to save space, but we need enough to analyze
                            if len(content) > 5000:
                                content = content[:5000] + "\n... [TRUNCATED]"
                            out.write(content)
                            out.write("\n")
                    except Exception as e:
                        out.write(f"Error reading {file}: {e}\n")

if __name__ == '__main__':
    generate_summary(r'c:\SEM 5\Embedded Lab', 'repo_summary.txt')
