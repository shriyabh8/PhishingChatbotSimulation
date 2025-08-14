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

**IMPORTANT: To use this project you MUST create a google Gemini API Key**
Here's how you create an API Key for Gemini

1. Follow this link: https://aistudio.google.com/apikey 
2. Log into your google account
3. Then click, ‘Create API Key’
4. Make note of that API Key, we will be utilizing that in the next step


How to Start: 

1. Type in chrome://extensions/ in the browser
2. Download this Github repository & upload the PhishingChatbotPDE folder to the 'Load Unpacked' button
3. Open the project in the terminal and enter cd PhishingChatbotPDE ~ ensure you are in that folder!!
4. Then, enter 'nano .env' (this creates the .env file)
5. Then enter GOOGLE_API_KEY="Your-API-Key-Here"
6. Then enter Control + X, then Y to save your changes
7. Next enter the following command: cd scripts
8. Once in scripts, enter: python3 api.py (this should start up the server)

How to use: 
Once you follow the steps above, a + icon should appear at the bottom right hand side of your screen, click on this button to start using the product! :)
