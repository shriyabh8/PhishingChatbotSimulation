Project Description: 

The purpose of this workshop is to show participants how easy it is to construct a phishing chatbot, and ways to avoid revealing sensitive data to such chatbots. 
This PDE would utilize python to create the back end of the chatbot & would use Google’s Gemini API to build & train the AI model. The chatbot would simulate a phishing 
attack by prompting the user for sensitive information on a given website using the information presented in the website to seem like a part of the site. This project 
would illustrate how feasible it is to extract sensitive data using AI through the form of Chatbots. It's important for developers and system administrators to be aware of 
vulnerabilities brought by AI chatbots and take appropriate steps to mitigate them to ensure the security of their systems and protect against potential attacks. 

Dependencies: 
- 
- Ensure you have python3 installed
- Ensure you have flask installed
- ensure you have python-dotenv and google-generativeai installed
- Note: all of these dependencies should be satisfied by activating the virtual environment
    - source venv/bin/activate 

How to Start: 

1. Type in chrome://extensions/ in the browser
2. Download this Github repository & upload the PhishingChatbotPDE folder to the 'Load Unpacked' button
3. Open the project in the terminal and enter cd scripts
4. Once in scripts, enter: python3 api.py
