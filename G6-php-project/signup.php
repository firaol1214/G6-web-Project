
<?php
// Initialize variables
$fname = $lname = $email = $sex = $pass1 = $pass2 = "";
$err = [];
$congra = "";

// Database connection
$conn = mysqli_connect("localhost", "root", "", "db");
if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

// Form submission handling
if (isset($_POST['signup'])) {
    // Sanitize inputs
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $sex = mysqli_real_escape_string($conn, $_POST['sex']);
    $pass1 = mysqli_real_escape_string($conn, $_POST['pass1']);
    $pass2 = mysqli_real_escape_string($conn, $_POST['pass2']);

    // Validation
    if ($pass1 !== $pass2) {
        array_push($err, "The two passwords do not match.");
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        array_push($err, "Invalid email format.");
    }

    // Check if user already exists
    $user_check_query = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
    $result = mysqli_query($conn, $user_check_query);
    if (mysqli_num_rows($result) > 0) {
        array_push($err, "Email already exists.");
    }

    // If no errors, register the user
    if (count($err) === 0) {

        // Insert user into the database using prepared statements
        $query = "INSERT INTO users (firstname, lastname, sex, email, password) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "sssss", $fname, $lname, $sex, $email, $pass1); // Fixed typo here

        if (mysqli_stmt_execute($stmt)) {
            $congra = "You are successfully registered! <a href='login.php' style='color: white;'>Login here</a>. ";
        } else { 
            array_push($err, "Registration failed. Please try again.");
        }
        mysqli_stmt_close($stmt);
    }
}







    
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/signup.css">
</head>
<body>
    <!-- Registration -->
    <nav>
        <div class="logo">
        <h1>Arsi University Students Cafe</h1>
        </div>
        <ul>
            <li><a href="./login.php">Login</a></li>
        </ul>
        <div class="menu-icon">
            <i class="fa fa-bars"></i>
        </div>
    </nav>
<div class="box2">
        <h1>SIGNUP HERE</h1>
        <div class="err">
            <?php
            include "err.php";
            ?>
        </div>
        <?php
            echo $congra;
            ?>
        <form action="signup.php" method="post">
        <input type="text" name="fname" id="" placeholder="Enter first name" required>
        <input type="text" name="lname" id="" placeholder="Enter last name" required>
        <input type="email" name="email" id="" placeholder="Enter Email" required>
        <input type="password" name="pass1" id="" placeholder="Enter password"required>
        <input type="password" name="pass2" id="" placeholder="Confirm password"required>
        <label>Sex</label>
        <input type="radio" name="sex" id="" value="male" required>Male
        <input type="radio" name="sex" id="" value="male" required>Female
        
       
        <input type="submit" value="Signup" name="signup">
        Already a member? <a href="login.php" style="color: orange;">Login</a>
        </form>
    </div>
</body>
</html>