<?php
    if(isset($_COOKIE['mailTimeout'])) {
   
    }
?>

<!doctype html>
<html>
<head>
    <!--PAGE SPECIFIC-->
    <title>DASH - Contact</title>
    <link rel="stylesheet" type="text/css" href="_css/contact.css"/>
    
    <?php include '_includes/meta.php'?>
    
    <?php
        if(isset($_COOKIE['mailTimeout'])) {
            echo "<meta http-equiv=\"refresh\" content=\"7;url=index.php\"/>";
        }
    ?>
</head>
<body>
    <!--CONTENT-->
    <script type="text/javascript">
        window.location.href = "index.php";
    </script>
    <div id="wrapper">
        <div id="content">
            <?php
                if(isset($_COOKIE['mailTimeout'])) {
                    $timeoutTime = $_COOKIE['mailTimeout'];
                    $hours = str_pad($timeoutTime / 3600 % 24, 2, '0', STR_PAD_LEFT);
                    $minutes = str_pad($timeoutTime / 60 % 60, 2, '0', STR_PAD_LEFT);;
                    $seconds = str_pad($timeoutTime % 60, 2, '0', STR_PAD_LEFT);;
                    
                    echo "<h3 id=\"mail-timeout-text\">Email sent too recently. Next available at: $hours:$minutes:$seconds.<br>Redirecting...</h3>";
                    die();
                }
            ?>
            <form method="post" action=
                  "<?php echo htmlspecialchars('_includes/mail.php');?>"
                  name="request" id="request">

                <h1>email</h1>

                <section id="email-form-info">
                    <div class="form-section-header"><h2 id="email-form-greeting">Hi there!</h2></div>
                    <div class="form-input-wrapper">
                        <label for="form-firstName">First name</label>
                        <input type="text" id="form-firstName" class="email-form-input" name="FirstName" maxlength="20" autofocus>
                    </div>
                    <div class="form-input-wrapper">
                        <label for="form-lastName">Surname</label>
                        <input type="text" id="form-lastName" class="email-form-input" name="LastName" maxlength="25" required>
                    </div>
                    <div class="form-input-wrapper">
                        <label for="form-email">Email</label>
                        <input type="email" id="form-email" class="email-form-input" name="Email" maxlength="50" required>
                    </div>
                </section>

                <section id="email-form-subject">
                    <div class="form-section-header"><h2>What's on your mind?</h2></div>
                    <div class="form-input-wrapper">
                        <label for="form-subject">Subject</label>
                        <input type="text" id="form-subject" class="email-form-input" name="Subject" maxlength="40" required>
                    </div>
                </section>

                <section id="email-form-main">
                    <div class="form-section-header"><h2>Go on...</h2></div>
                    <div class="form-message-wrapper">
                        <label for="message">Message</label>
                        <textarea id="message" name="Message" maxlength="1000" required></textarea>
                    </div>
                </section>

                <section id="email-form-final">
                    <input type="submit" id="form-send" value="Send" name="Submit">
                </section>

            </form>
        </div>
    </div>
    <!--END CONTENT-->
</body>
</html>