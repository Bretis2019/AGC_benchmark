from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run_script', methods=['POST'])
def run_script():
    file = request.files['file']
    file.save('uploaded_script.py')

    result = subprocess.run(['python', 'benchmark.py', 'uploaded_script.py'], capture_output=True)
    score = json.loads(result.stdout)['score']

    return jsonify({'score': score})

if __name__ == '__main
