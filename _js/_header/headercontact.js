$(document).ready(function () {
    
//Declarations
    
    var contactWrapper              = $("#contact-wrapper"),
        contactDiscardButton        = $("#contact-discard"),
        contactInvokeButton         = $("#contact-invoke"),
        contactDismissArea          = $("#contact-dismiss"),
    
        contactForm                 = $("#contact-wrapper > form"),
        contactFormInfoSection      = $("#email-form-info"),
        contactFormSubjectSection   = $("#email-form-subject"),
        contactFormMainSection      = $("#email-form-main"),
        contactFormFinalSection     = $("#email-form-final"),
    
        contactFirstNameInput       = $("input[name='FirstName']"),
        contactLastNameInput        = $("input[name='LastName']"),
        contactEmailInput           = $("input[name='Email']"),
        contactSubjectInput         = $("input[name='Subject']"),
        contactSubmitInput          = $("#form-send"),
        contactMessageInput         = $("#message"),
    
        contactCharacterCount       = $("#count"),
        contactComposeButton        = $("#header-compose-button-wrapper"),
        contactComposeImage         = $("#compose-button"),
    
        maxCount                    = 1000,
        count                       = 0,
        currentCount                = 1000,
        discardEnabled              = false,
        
        //Styling exceptions
        indexAboutHeader            = $("#about-header"),
        photosSubHeaderWrapper      = $("#subheader-wrapper"),
        audioWrapper                = $("#audio-wrapper"),
        
        //This array contains the cookie name values for all input fields.
        cookieNameArray             = [
            "FirstName", "LastName", "Email", "Subject", "Message"
        ],
        
        //This array contains the input field variables assigned above.
        inputNamesArray             = [
            contactFirstNameInput,
            contactLastNameInput,
            contactEmailInput,
            contactSubjectInput,
            contactMessageInput
        ],
        
        //States the compose window can be in. Default: Closed.
        contactWindowStates         = {
            CLOSED      : 0,
            OPENEMPTY   : 1,
            OPENFILLED  : 2,
            MINIMIZED   : 3
        },
        
        contactWindowState          = contactWindowStates.CLOSED,
        mailTimeoutText             = $('#mail-timeout-text'),
        mailTimeout                 = readCookie('mailTimeout');
    
//Functions
    
    function cookieFormSave() {
        createCookie("FirstName", contactFirstNameInput.val(), 14);
        createCookie("LastName", contactLastNameInput.val(), 14);
        createCookie("Email", contactEmailInput.val(), 14);
        createCookie("Subject", contactSubjectInput.val(), 14);
        createCookie("Message", contactMessageInput.val(), 14);
    }
    
    function cookieFormClear() {
        eraseCookie("FirstName");
        eraseCookie("LastName");
        eraseCookie("Email");
        eraseCookie("Subject");
        eraseCookie("Message");
    }
    
    function cookieFormLoad() {
        for (i = 0; i < cookieNameArray.length; i += 1) {
            var value = cookieNameArray[i];
            
            if (value) {
                inputNamesArray[i].val(readCookie(value));
            }
            
            if (inputNamesArray[i].val().length > 0) {
                contactWindowState = contactWindowStates.MINIMIZED;
            }
        }
    }
    
    function scrollEnable() {
        $('body').css("overflow", "auto");
        
        if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                ) {
            $('body').removeClass('bodylocked');
        }
    }

    function scrollDisable() {
        $('body').css("overflow", "hidden");
        
        if (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                ) {
            $('html, body').animate({ scrollTop: 0}, { easing : 'linear' }, 500);
            setTimeout(function () {
                $('body').addClass('bodylocked');
            }, 500);
        }
    }
    
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    
    function contactFormDiscardVisibility() {
        if (contactFirstNameInput.val().length > 0      ||
                contactLastNameInput.val().length > 0   ||
                contactEmailInput.val().length > 0      ||
                contactSubjectInput.val().length > 0    ||
                contactMessageInput.val().length > 0
                ) {
            contactDiscardButton.show();
            contactForm.css("padding-top", "2.5em");
            discardEnabled = true;
            contactWindowState = contactWindowStates.OPENFILLED;
        } else {
            contactFormClear();
            contactDiscardButton.hide();
            contactForm.css("padding-top", "0");
            discardEnabled = false;
            contactWindowState = contactWindowStates.OPENEMPTY;
        }
    }
    
    function contactFormSectionVisibility() {
        if (contactLastNameInput.val().length > 0) {
            if (contactEmailInput.valid()) {
                contactFormSubjectSection.slideDown(500);
                if (contactSubjectInput.val().length > 0) {
                    contactFormMainSection.slideDown(500);
                    if (contactMessageInput.val().length > 2) {
                        contactFormFinalSection.slideDown(500);
                    } else {
                        contactFormFinalSection.slideUp(250);
                    }
                } else {
                    contactFormMainSection.slideUp(250);
                    contactFormFinalSection.slideUp(250);
                }
            } else {
                contactFormSubjectSection.slideUp(250);
                contactFormMainSection.slideUp(250);
                contactFormFinalSection.slideUp(250);
            }
        } else {
            contactFormSubjectSection.slideUp(250);
            contactFormMainSection.slideUp(250);
            contactFormFinalSection.slideUp(250);
        }
    }
    
    function contactFormGreeting() {
        if (contactFirstNameInput.valid() && contactFirstNameInput.val().length > 0) {
            $("#email-form-greeting").text("Hi, " + capitalize(contactFirstNameInput.val()) + "!");
        } else {
            $("#email-form-greeting").text("Hi there!");
        }
    }
    
    function contactFormClear() {
        contactFirstNameInput.val(null);
        contactLastNameInput.val(null);
        contactEmailInput.val(null);
        contactSubjectInput.val(null);
        contactMessageInput.val(null);
        cookieFormClear();
    }

    function contactFormClose() {
        if (contactWrapper.is(':animated')) {
            return false;
        }
        
        scrollEnable();
        contactWrapper.slideUp(500);
        contactDismissArea.velocity('fadeOut', { duration : 500});
        
        setTimeout(function () {
            contactComposeImage.attr("src", "_images/_header/compose-button.png");
            contactForm.css("padding", "0 1em 1em 1em");
            contactFormSubjectSection.hide();
            contactFormMainSection.hide();
            contactFormFinalSection.hide();
            contactDiscardButton.hide();
            contactFormGreeting();
            contactWindowState = contactWindowStates.CLOSED;
        }, 500);
    }
    
    function contactFormCompose() {
        if (contactWrapper.is(':animated')) {
            return false;
        }
        
        scrollDisable();
        contactComposeImage.attr("src", "_images/_header/compose-open-button.png");
        contactWrapper.slideDown(500);
        contactDismissArea.velocity('fadeIn', { duration : 500});
        setTimeout(contactWindowState = contactWindowStates.OPENEMPTY, 500);
    }

    function contactFormMinimize() {
        if (contactForm.is(':animated')) {
            return false;
        }
        
        if (indexAboutHeader.length) {
            indexAboutHeader.animate({ 'paddingTop': '+1.5em'});
            $("#wrapper").animate({ 'marginTop': '+1.5em'}, 500);
        } else if (audioWrapper.length) {
            if ($(window).width() < 1600) {
                $("#lyrics-close-button").animate({
                    'height': '4em',
                    'paddingTop': '+2.25em'
                }, 500);
            }
            $("#audio-wrapper").animate({ 'marginTop': '+1.5em'}, 500);
        } else if (photosSubHeaderWrapper.length) {
            $("#wrapper").animate({ 'marginTop': '+2.25em'}, 500);
        } else {
            $("#wrapper").animate({ 'marginTop': '+1.5em'}, 500);
        }
        
        scrollEnable();
        contactWrapper.addClass("contact-wrapper-minimized");
        contactForm.slideUp(500);
        contactDiscardButton.slideUp(500);
        contactDismissArea.velocity('fadeOut', { duration : 500});
        
        setTimeout(function () {
            contactInvokeButton.slideDown(250);
        }, 250);
        
        setTimeout(function () {
            contactComposeImage.attr("src", "_images/_header/compose-button.png");
            contactWindowState = contactWindowStates.MINIMIZED;
        }, 500);
    }
    
    function contactFormMaximize() {
        if (contactForm.is(':animated')) {
            return false;
        }
        
        count = contactMessageInput.val().length;
        currentCount = maxCount - count;
        contactCharacterCount.text(currentCount);
        
        if (indexAboutHeader.length) {
            indexAboutHeader.animate({ 'paddingTop': '-0em'});
        } else if (audioWrapper.length) {
            $("#lyrics-close-button").animate({
                'height': '2.5em',
                'paddingTop': '0em'
            }, 500);
            $("#audio-wrapper").animate({ 'marginTop': '0em'}, 500);
        }
        $("#wrapper").animate({ 'marginTop': '-0em'}, 500);
        
        contactComposeImage.attr("src", "_images/_header/compose-open-button.png");
        scrollDisable();
        contactWrapper.removeClass("contact-wrapper-minimized");
        contactForm.slideDown(500);
        contactDismissArea.velocity('fadeIn', { duration : 500});
        contactInvokeButton.slideUp(250);
        contactDiscardButton.slideDown(500);
        
        contactWindowState = contactWindowStates.OPENFILLED;
    }
    
    function contactFormResume() {
        //Checks window state at load
        //If state is minimized, start minimized. 
        if (contactWindowState === 3) {
            //Same as contactFormSectionVisibility, but adapted to onLoad
            if (contactLastNameInput.val().length > 0) {
                if (contactEmailInput.val().length > 0) {
                    contactFormSubjectSection.show();
                    if (contactSubjectInput.val().length > 0) {
                        contactFormMainSection.show();
                        if (contactMessageInput.val().length > 2) {
                            contactFormFinalSection.show();
                        }
                    }
                }
            }
            
            if (indexAboutHeader.length) {
                indexAboutHeader.css({ 'paddingTop': '+1.5em'});
                $("#wrapper").css({ 'marginTop': '+1.5em'}, 500);
            } else if (audioWrapper.length) {
                if ($(window).width() < 1600) {
                    $("#lyrics-close-button").css({
                        'height': '4em',
                        'paddingTop': '+2.25em'
                    }, 500);
                }
                $("#audio-wrapper").css({ 'marginTop': '+1.5em'}, 500);
            } else if (photosSubHeaderWrapper.length) {
                $("#wrapper").css("marginTop", "+2.25em");
            } else {
                $("#wrapper").css("marginTop", "+1.5em");
            }
            
            contactWrapper.addClass("contact-wrapper-minimized");
            contactForm.css("padding-top", "2.5em");
            discardEnabled = true;
            
            contactForm.hide();
            contactDiscardButton.hide();
            contactWrapper.show();
            contactInvokeButton.show();
        }
    }
    
    function contactCookie() {
        mailTimeout = readCookie('mailTimeout');
        
        if (mailTimeout !== null) {
            var timeoutTime = new Date(mailTimeout * 1000),
                hours = ('0' + timeoutTime.getHours()).slice(-2),
                minutes = ('0' + timeoutTime.getMinutes()).slice(-2),
                seconds = ('0' + timeoutTime.getSeconds()).slice(-2);
            
            setTimeout(function () {
                contactSubmitInput.hide();
                mailTimeoutText.show();
                mailTimeoutText.text('Email sent too recently. Next available at: ' + hours + ':' + minutes + ':' + seconds);
            }, 2000);
            
            setTimeout(function () {
                
                mailTimeoutText.slideUp(500);
                setTimeout(function () {
                    contactSubmitInput.slideDown(500);
                }, 750);
                
            }, (mailTimeout - Math.round(Date.now() / 1000)) * 1000);
        } else {
            contactSubmitInput.show();
            mailTimeoutText.hide();
        }
    }
        
//Events
    
    $("#request").validate({
        //Rules
        rules: {
            LastName: {
                required: true
            },
            
            Email: {
                required: true,
                email: true
            },
            
            Subject: "required",
            
            Message: {
                required: true,
                minlength: 3
            },
            
            onkeyup: false //turn off auto validate whilst typing
        },
        
        //messages
        messages: {
            FirstName: {
                lettersonly: "Only letters (A-Z)"
            },
            
            LastName: {
                required: "Required",
                lettersonly: "Only letters (A-Z)"
            },
            
            Email: {
                required: "Required",
                email: "Invalid format"
            },
            
            Subject: {
                required: "Required"
            },
            
            Message: {
                required: "This field is required",
                minlength: "Minimum 3 characters"
            }
        },
        
        //submit
        submitHandler: function (form) {
            form.submit("form[name='request']");
        }
    });
    
    contactComposeButton.click(function () {
        switch (contactWindowState) {
        case 0:
            contactFormCompose();
            contactFormGreeting();
            break;
        case 1:
            contactFormClose();
            break;
        case 2:
            contactFormMinimize();
            break;
        case 3:
            contactFormMaximize();
            contactFormGreeting();
            break;
        }
        contactComposeButton.blur();
    });
    
    contactDiscardButton.click(function () {
        contactFormClear();
        contactFormClose();
    });
    
    contactDismissArea.click(function () {
        if (contactFirstNameInput.val().length === 0    &&
                contactLastNameInput.val().length === 0 &&
                contactEmailInput.val().length === 0    &&
                contactSubjectInput.val().length === 0  &&
                contactMessageInput.val().length === 0
                ) {
            contactFormClose();
        } else {
            contactFormMinimize();
        }
    });
    
    contactInvokeButton.click(function () {
        contactFormGreeting();
        contactFormMaximize();
    });
    
    //Handle section visibility
    contactFormInfoSection.keyup(function () {
        cookieFormSave();
        contactFormDiscardVisibility();
        contactFormSectionVisibility();
    });
    
    contactFormSubjectSection.keyup(function () {
        cookieFormSave();
        contactFormDiscardVisibility();
        contactFormSectionVisibility();
    });
    
    contactFormMainSection.keyup(function () {
        cookieFormSave();
        contactFormDiscardVisibility();
        contactFormSectionVisibility();
    });
    
    //Prevents multiple emails from being sent by clicking on submit multiple times
    contactSubmitInput.click(function (e) {
        e.preventDefault();
        if ($('#request').valid()) {
            contactSubmitInput.val('Processing...');
            $(this).attr("disabled", "true");
            
            $.ajax({
                url: '_includes/mail.php',
                type: 'POST',
                data: {
                    FirstName: contactFirstNameInput.val(),
                    LastName: contactLastNameInput.val(),
                    Email: contactEmailInput.val(),
                    Subject: contactSubjectInput.val(),
                    Message: contactMessageInput.val()
                },
                success: function (data) {
                    contactForm.animate({ 'paddingTop' : 0}, 500);
                    contactDiscardButton.slideUp(500);
                    setTimeout(function () {
                        contactFormClear();
                        contactFormClose();
                        popnotify("_images/_popnotify/popnotify-email-sent.png", "Email Sent", void 0, 2500);
                        
                        setTimeout(function () {
                            contactSubmitInput.removeAttr("disabled");
                            contactSubmitInput.val("Send");
                        }, 250);
                    }, 2000);
                },
                complete: function () {
                    contactCookie();
                }
            });
        }
    }); //End click submit
    
    //Handle message character count
    contactCharacterCount.text(currentCount);
    contactMessageInput.keyup(function () {
        count = contactMessageInput.val().length;
        currentCount = maxCount - count;
        
        contactCharacterCount.text(currentCount);
        
        //Change color of string based on remaining characters
        if (currentCount < 10) {
            contactCharacterCount.css("color", "crimson");
        } else if (currentCount < 100) {
            contactCharacterCount.css("color", "orange");
        } else {
            contactCharacterCount.css("color", "rgb(150, 150, 150)");
        }
    });
    
    //Handle header of form-section-info
    contactFirstNameInput.focusout(contactFormGreeting);
    
    //Hide unnecessary content
    contactFormSubjectSection.hide();
    contactFormMainSection.hide();
    contactFormFinalSection.hide();
    mailTimeoutText.hide();
    contactSubmitInput.hide();
    
    //CSS styling based on header height
    if (photosSubHeaderWrapper.length) {
        contactWrapper.css("top", "3.9em");
    }
    
    //Check compose window state on load
    cookieFormLoad();
    contactFormResume();
    
    //Check for timeout cookie on load
    contactCookie();
    
    //If a button with href contact.php is pressed
    $("a[href$='contact.php']").click(function (e) {
        e.preventDefault();
        contactComposeButton.click();
    });
    
    //If header dropdown menu button is pressed, close / minimize email form
    $('#header-dropdown-button-wrapper, .header-flexspace, .player-option-button').click(function () {
        if (contactWindowState === contactWindowStates.OPENEMPTY) {
            contactFormClose();
            contactWindowState = contactWindowStates.CLOSED;
        }
        
        if (contactWindowState === contactWindowStates.OPENFILLED) {
            contactFormMinimize();
            contactWindowState = contactWindowStates.MINIMIZED;
        }
    });
    
    //If window is resized, adjust certain elements if they exist
    $(window).resize(function () {
        if (audioWrapper.length) {
            if (contactWindowState === contactWindowStates.MINIMIZED) {
                if ($(window).width() < 1600) {
                    $("#lyrics-close-button").css({
                        'height': '4em',
                        'paddingTop': '+2.25em'
                    }, 500);
                } else {
                    $("#lyrics-close-button").css({
                        'height': '2.5em',
                        'paddingTop': '0em'
                    }, 500);
                }
            }
        }
    });
    
    //Close /minimize email form when esc is pressed
    $(document).on('keydown', function (e) {
        if ($('#contact-wrapper').css('display') !== 'none' && !$('#contact-wrapper').hasClass('contact-wrapper-minimized')) {
            if (e.which === 27) {
                e.preventDefault();
                if (contactWindowState === contactWindowStates.OPENEMPTY) {
                    contactFormClose();
                    contactWindowState = contactWindowStates.CLOSED;
                }

                if (contactWindowState === contactWindowStates.OPENFILLED) {
                    contactFormMinimize();
                    contactWindowState = contactWindowStates.MINIMIZED;
                }
            }
        }
    });
    
    //Fire resize event on load to correct potential styling
    $(window).resize();
});