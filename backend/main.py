from flask import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



# Get data
@app.route("/request/getdata", methods=["POST"])
def GetData():
  data_send = request.get_json()

  print("Request get data from :", data_send["name"])

  with open("data/account.json", "r") as get_data:
    data_json = json.load(get_data)
    data = {
      "fullname": data_json[data_send["name"]]["Full Name"],
      "money": data_json[data_send["name"]]["Money"]
    }
    print("Succes Get Data")
    print("Full Name :", data["fullname"], "\nMoney :", data["money"])
    return jsonify(data)

# register
@app.route("/request/register", methods=["POST"])
def register():
  data_send = request.get_json()

  print("Request Register :", data_send["fullname"], "\nUsername :", data_send["username"], "\nEmail :", data_send["email"], "\nPhone :", data_send["phone"], "\nPassword :", data_send["password"])

  # cek account
  with open("data/account.json", "r") as register_read:
    json_register = json.load(register_read)

    # username ada
    if data_send["username"] in json_register:
      print("Username already exist")
      return jsonify({"Status": "USN_IS_EXIST"})

    for account in json_register.values():
      if data_send["email"] == account["Email"]:
        print("Email already exist")
        return jsonify({"Status": "EMAIL_IS_EXIST"})

    else:
      with open("data/account.json", "w") as register_write:
        json_register[data_send["username"]] = {
          "Password": data_send["password"],
          "Full Name": data_send["fullname"],
          "Email": data_send["email"],
          "Phone": data_send["phone"]
        }

        json.dump(json_register, register_write, indent=2)
        return jsonify({"Status": "SUCCES_CREATE_ACCOUNT"})

# login
@app.route("/request/login", methods=["POST"])
def login():
  
  data_send = request.get_json()

  print("Request Login :", data_send["name"], "\nPassword :", data_send["pw"])

  with open("data/account.json", "r") as login_read:
    json_login = json.load(login_read)

    if data_send["name"] in json_login:
      if data_send['pw'] == json_login[data_send["name"]]["Password"]:
        reply = {
          "Status": "ALL_GOOD"
        }
        print("Succes to Login")
        return jsonify(reply)
      else:
        reply = {
          "Status": "PW_IS_WRONG"
        }
        print("Password is wrong");
        return jsonify(reply)
    else:
      reply = {
        "Status": "ACCOUNT_NOT_EXIST"
      }
      print("Account is not exist!")
      return jsonify(reply)

if __name__ == "__main__":
  app.run(port=7777, debug=True)