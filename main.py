from flask import Flask, redirect, render_template, session, request, jsonify
import os
from dotenv import load_dotenv
from database import db_sync, check_login
import werkzeug.security
from werkzeug.security import check_password_hash

#db_sync()

languages = {"EN": ["English"],
             "DE": ["Deutsch"],
             "AEB": ["تونسي"],
             "AR": ["العربية"],
             "FR": ["Français"]
             }
app = Flask(__name__)

tours_data = [
        {"title": "Cartage Ruins", "location": "Tunis", "price": {"EN": "£40", "DE": "€50"}},
        {"title": "Roman Theatre of Cartage", "location": "Tunis", "price": {"EN": "£45", "DE": "€50"}},
        {"title": "Sidi Bou Said", "location": "Coastal", "price": {"EN": "£42", "DE": "€50"}},
    ]

load_dotenv()
app.secret_key = os.getenv("flask_secret_key")
default_lang = "EN"

@app.errorhandler(404)
def not_found_error():
    return render_template('not-found.html')

@app.route("/", methods=["POST"])
def web_login():
    data = request.get_json()  # got the json from our JS POST request
    email = data.get("email")
    user_password = data.get("password")
    cursor, connection = db_sync()
    password = check_login(email, cursor, connection)
    if password != False:
        result = check_password_hash(password, user_password)
        return jsonify({"Success": result})
    else:
        return jsonify({"Success": False})
        
@app.route("/set_langauge/<lang>")
def set_language(lang):
    if lang in languages.keys():
        session["lang"] = lang
    return redirect(request.referrer or "/")

@app.route("/tour_destination/<tour_name>")
def tour_destination(tour_name):
    for dict in tours_data:
        if tour_name in dict.values():
            return render_template("tour-card.html", tour= tour_name, details= dict )
    return render_template("not-found.html")

@app.context_processor
def inject_global():
    active_lang = session.get("lang", default_lang)
    return {"language":  languages,
            "active_lang": active_lang,
            "lang_info": languages.get(active_lang, languages["EN"])}
    
@app.route("/")
def home():
    tours_data = [
        {"title": "Cartage Ruins", "location": "Tunis", "price": {"EN": "£40", "DE": "€50"}},
        {"title": "Roman Theatre of Cartage", "location": "Tunis", "price": {"EN": "£45", "DE": "€50"}},
        {"title": "Sidi Bou Said", "location": "Coastal", "price": {"EN": "£42", "DE": "€50"}},
    ]
    return render_template("index.html", tours = tours_data)

@app.route("/tours")
def tours():
    return render_template("tours.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/booking")
def booking():
    return render_template("booking.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")
    
def hash_pass(user_password):
    new_pass = werkzeug.security.generate_password_hash(user_password)
    return new_pass

if __name__ == "__main__":
    app.run(debug = True)