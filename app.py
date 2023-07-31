from flask import Flask, render_template, request, session, redirect
from flask_session import Session
import hashlib

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config['SALT'] = "DSO"
Session(app)

@app.route('/')
def map():  # put application's code here

    markers = []
    # for each sighting in the db, construct the description and append to the markers list
    # description shoudl include the name, date, animal name and a link to wildnet. as well as the image
    # the links should open in a new window.
    markers.append({'description': "this is a place of interest <img src=\"/static/images/croc.jpg\" width='100px'><br/><a href=\"http://www.google.com\" target='_blank'>google</a>", "longitude": 145.7427, "latitude": -16.974 })
    markers.append({'description': "this is another place of interest <img src=\"/static/images/croc.jpg\" width='100px'><br/><a href=\"http://www.google.com\" target='_blank'>google</a>", "longitude": 144.7427, "latitude": -15.974 })

    return render_template("map.html", markers=markers)


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        if request.form.get("register"):
            # save to database.
            print("Saving to database")

        session["name"] = request.form.get("name")

        db_pwd = request.form.get("password") + app.config['SALT']
        # this is the password that gets stored and checked in the db.
        hashed_pwd = hashlib.sha512(db_pwd.encode('utf-8')).hexdigest()
        print(hashed_pwd)

        # check against the db.
        print("Checking against the db")
        return redirect("/")

    return render_template("login_register.html")


@app.route("/sighting", methods=["GET", "POST"])
def sighting():
    if request.method == "POST":
        # save to database.
        print("Saving to database")
        print(f"{session.get('name')}")
        print(f"Animal: {request.form.get('animal')}")
        print(f"lat: {request.form.get('latitude')} long:{request.form.get('longitude')}")

        # link to wildnet db based on animal name.
        # need to get the species id from the api.
        
           # https://www.wildnet.org.au/animal/animal_name
       #https://apps.des.qld.gov.au/species-search/details/?id=583


        return redirect("/")

    return render_template("add_sighting.html")


@app.route("/logout")
def logout():
    session["name"] = None
    return redirect("/")


if __name__ == '__main__':
    app.run()
