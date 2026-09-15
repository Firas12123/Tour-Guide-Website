from flask import Flask, redirect, render_template, session, request
import os
from dotenv import load_dotenv

languages = {"EN": ["English"],
             "DE": ["Deutsch"],
             "AEB": ["تونسي"],
             "AR": ["العربية"],
             "FR": ["Français"]
             }
app = Flask(__name__)

load_dotenv()
app.secret_key = os.getenv("flask_secret_key")
default_lang = "EN"

@app.route("/set_langauge/<lang>")
def set_language(lang):
    if lang in languages.keys():
        session["lang"] = lang
    return redirect(request.referrer or "/")

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
    

if __name__ == "__main__":
    app.run(debug = True)
