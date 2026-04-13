from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

# ✅ DB Connection
def get_db():
    return psycopg2.connect(
        host="13.204.226.27",   # 🔥 replace this
        database="image_db",
        user="myuser",
        password="mypassword",
        port=5432
    )

# ✅ Health check (ALB)
@app.route("/")
def health():
    return {"status": "healthy"}, 200

# ✅ LOGIN API
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        # 🔒 validation
        if not data or "username" not in data or "password" not in data:
            return {"error": "Invalid input"}, 400

        conn = get_db()
        cur = conn.cursor()

        cur.execute(
            "SELECT password FROM users WHERE username=%s",
            (data["username"],)
        )

        user = cur.fetchone()

        cur.close()
        conn.close()

        # ✅ check user
        if user and user[0] == data["password"]:
            return {"status": "success"}, 200

        return {"status": "fail"}, 401

    except Exception as e:
        print("Error:", e)
        return {"error": "Server error"}, 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
