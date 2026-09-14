from flask import Flask, render_template

languages = {"EN": {"English"},
             "GE": {"German"},
             "TU": {"Tunisian"},
             "AR": {"Arabic"}}
app = Flask(__name__)

@app.context_processor
def inject_global():
    return {"language":  languages}
@app.route("/")
def home():
    tours_data = [
        {"title": "Cartage Ruins", "location": "Tunis", "price": {"English": "£40", "German": "€50"}},
        {"title": "Roman Theatre of Cartage", "location": "Tunis", "price": {"English": "£45", "German": "€50"}},
        {"title": "Sidi Bou Said", "location": "Coastal", "price": {"English": "£42", "German": "€50"}},
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
