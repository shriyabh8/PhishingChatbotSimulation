from flask import Flask, request, jsonify
from flask_cors import CORS
from responses import ResponseSchema

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, methods=["POST", "OPTIONS"], allow_headers=["Content-Type"])

# Create a single global instance to maintain chat session
goal_agent = ResponseSchema()

@app.route('/extract_ssn', methods=['POST', 'OPTIONS'])
def extract_ssn_route():
    if request.method == 'OPTIONS':
        # Preflight request: respond with appropriate headers
        response = app.make_default_options_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return response

    data = request.get_json(force=True)
    user_input = data.get('user_input', '')
    
    # Use the same global instance to maintain ongoing chat
    result = goal_agent.extract_ssn(user_input)

    response = jsonify({'response': result})
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

@app.route('/reset_chat', methods=['POST', 'OPTIONS'])
def reset_chat_route():
    """Optional endpoint to reset the chat session if needed"""
    if request.method == 'OPTIONS':
        response = app.make_default_options_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return response
    
    global goal_agent
    goal_agent = ResponseSchema()  # Create a new instance to reset the chat
    
    response = jsonify({'response': 'Chat session has been reset.'})
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

if __name__ == '__main__':
    app.run(port=5000, debug=True)