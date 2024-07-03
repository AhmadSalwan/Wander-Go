from flask import request,jsonify
from config import app,db
from models import user

@app.route("/list_user",methods=["GET"])
def get_user():
    users=user.query.all()
    json_user=list(map(lambda x:x.to_json(),users))
    return jsonify({"users":json_user})

@app.route("/create_user",methods=["POST"])
def create_user():
    username=request.json.get("username")
    email=request.json.get("email")
    password=request.json.get("password")
    gender=request.json.get("gender")
    alamat=request.json.get("alamat")

    if not username or not email or not password or not gender or not alamat:
        return(jsonify({"message":"Jangan Ada Yang Kosong"}))

    new_user=user(username=username,email=email,password=password,gender=gender,alamat=alamat)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message":str(e)}),400
    
    return jsonify({"message":"User Created"}),201

@app.route("/update_user/<int:user_id>",methods=["PATCH"])
def update_user(user_id):
    current_user=user.query.get(user_id)

    if not current_user:
        return jsonify({"message":"User Not Found"}),404
    
    data=request.json
    current_user.username=data.get("username",current_user.username)
    current_user.email=data.get("email",current_user.email)
    current_user.password=data.get("password",current_user.password)
    current_user.gender=data.get("gender",current_user.gender)
    current_user.alamat=data.get("alamat",current_user.alamat)

    db.session.commit()
    return jsonify({"message":"User Updated"}),200

@app.route("/delete_user/<int:user_id>",methods=["DELETE"])
def delete_user(user_id):
    current_user=user.query.get(user_id)
    if not current_user:
        return jsonify({"message":"User Not Found"}),404
    
    db.session.delete(current_user)
    db.session.commit()

    return jsonify({"message":"User Deleted"}),200
    

if __name__=="__main__":
    with app.app_context():
       db.create_all()
    app.run(debug=True)