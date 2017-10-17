<div id="contact-dismiss"></div>
<div id="contact-wrapper">
    <input type="button" id="contact-discard" value="Discard">
    <form method="post"
          name="request" id="request">

        <h1 id="email-header">Email</h1>

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
                <div id="count"></div>
            </div>
        </section>

        <section id="email-form-final">
            <h3 id="mail-timeout-text">Email sent too recently.</h3>
            <input type="submit" id="form-send" value="Send" name="Submit">
        </section>

    </form>
    <input type="button" id="contact-invoke" value="Resume Email">
</div>