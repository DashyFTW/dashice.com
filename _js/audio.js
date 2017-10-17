$(document).ready(function () {
    //Initialization
    //Points to current track and lyric ID's
    var trackPointer = 0, lyricsPointer = 0,
        trackCount = $(".track").length,  //Count total audio tracks
        timeInterval,                    //Tracks time using setInterval
        preserveScroll,
        volumeWarned = false;

    function fadeOutCoverBlur() {
        $('.track' + trackPointer).parent().parent().parent().find('.cover-blurred').finish();

        for (i = 0; i <= trackCount; i = i + 1) {
            $('.track' + i).parent().parent().parent().find('.cover-blurred').fadeOut();
        }
    }

    function fadeInCoverBlur() {
        $('.track' + trackPointer).parent().parent().parent().find('.cover-blurred').stop();

        $('.track' + trackPointer).parent().parent().parent().find('.cover-blurred').fadeIn();
    }

    //Handle loading
    function loadhandler(func) {
        if ($('.track' + trackPointer).hasClass('loaded')) {
            fadeInCoverBlur();
            $('#player-cover-wrapper > div').hide();
            func;
            return 0;
        }

        $('#player-cover-wrapper > div').show();
        $('.track' + trackPointer).on('canplaythrough', function () {
            fadeInCoverBlur();
            $('#player-cover-wrapper > div').hide();
            func;
        });
    }

    //Resets current track
    function resetCurrent() {
        $('.track' + trackPointer).get(0).currentTime = 0;
    }

    //Pauses current track
    function pauseCurrent() {
        $('.track' + trackPointer).get(0).pause();
    }

    //Resumes / plays current track
    function playCurrent() {
        $('.track' + trackPointer).get(0).play();
    }

    //Pauses all tracks
    function pauseAll() {
        $('audio').each(function () {
            this.pause(); // Stop playing
            this.currentTime = 0; // Reset time
        }); //End each on audio
    }

    //Hide the media player and adjust other elements
    function hidePlayer() {
        $('main').css("margin-bottom", "0");
        $('#lyrics-wrapper').css("height", "calc(100vh - 2.5em)");
        $('#player-wrapper').css("display", "none");
        $('#contact-wrapper').removeClass('contact-wrapper-player-invoked');
    }

    //Show the media player and adjust other elements
    function showPlayer() {
        $('main').css("margin-bottom", "5em");
        $('#lyrics-wrapper').css("height", "calc(100vh - 7.5em)");
        $('#player-wrapper').css("display", "flex");
        $('#contact-wrapper').addClass('contact-wrapper-player-invoked');
        
        if (document.cookie.indexOf('volume') >= 0) {
            var volume = readCookie('volume') * 100;
        } else {
            var volume = 75;
        }
        
        if (volume === 0 && volumeWarned !== true) {
            alert('Volume is turned all the way down.');
            volumeWarned = true;
        }
    }

    //Hides play-button, shows pause-button
    function showPauseButton() {
        $('#play-button').hide();
        $('#pause-button').show();
    }
    
    //Show hide volume slider
    function showVolumeSlider(bool) {
        if (bool) {
            if (!$('#player-volume-icon').hasClass('selected')) {
                $('#player-volume-icon').addClass('selected');
                $('#player-volume-wrapper').velocity('fadeIn', { duration : 250, display : 'flex' });
                $('#prev-button, #next-button').velocity('fadeOut', { duration : 250 });
                if ($('.track' + trackPointer)[0].paused) {
                    $('#play-button').velocity('fadeOut', { duration : 250 });
                } else {
                    $('#pause-button').velocity('fadeOut', { duration : 250 });
                }
            }
        } else {
            if ($('#player-volume-icon').hasClass('selected')) {
                $('#player-volume-icon').removeClass('selected');
                $('#player-volume-wrapper').velocity('fadeOut', { duration : 250 });
                $('#prev-button, #next-button').velocity('fadeIn', { duration : 250 });
                if ($('.track' + trackPointer)[0].paused) {
                    $('#play-button').velocity('fadeIn', { duration : 250 });
                } else {
                    $('#pause-button').velocity('fadeIn', { duration : 250 });
                }
            }
        }
    }
    
    //Handle volume icon
    function volumeIcon(float) {
        if (float <= 0) {
            $('#player-volume-icon').css('background-image', 'url(_images/_player/vol0.png)');
        } else if (float <= 0.24) {
            $('#player-volume-icon').css('background-image', 'url(_images/_player/vol1.png)');
        } else if (float <= 0.49) {
            $('#player-volume-icon').css('background-image', 'url(_images/_player/vol25.png)');
        } else if (float <= 0.74) {
            $('#player-volume-icon').css('background-image', 'url(_images/_player/vol50.png)');
        } else {
            $('#player-volume-icon').css('background-image', 'url(_images/_player/vol75.png)');
        }
    }

    //Show play-button, hides pause-button
    function showPlayButton() {
        $('#pause-button').hide();
        $('#play-button').show();
    }

    //Parses and formats duration of a track to int
    function formatDuration(duration) {
        var timeString,
            hours   = parseInt(duration / 3600, 10),
            minutes = parseInt(duration / 60, 10),
            seconds = parseInt(duration % 60, 10);

        if (minutes < 1 && minutes > 0) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (hours === 0) {
            timeString = minutes + ":" + seconds;
        } else {
            timeString = hours + ":" + minutes + ":" + seconds;
        }

        return timeString;
    }

    //Updates current and remaining durations of playing track
    function updateDuration(timeInterval) {
        var track = $('.track' + trackPointer),
            currentDuration,
            remainingDuration,
            totalDuration;

        if (!track.get(0).ended) {
            totalDuration = track.get(0).duration;
            currentDuration = track.get(0).currentTime;
            remainingDuration = track.get(0).duration - track.get(0).currentTime;

            $('#current-duration').text(formatDuration(currentDuration));
            $('#remaining-duration').text("-" + formatDuration(remainingDuration));
            $('#total-duration').text(formatDuration(totalDuration));
            progressBarFill(currentDuration, totalDuration);
        } else {
            fadeOutCoverBlur(trackPointer, trackCount);
            $('#current-duration').text("0:00");
            $('#remaining-duration').text("-0:00");
            $('total-duration').text("0:00");
            showPlayButton();
            resetCurrent();
        }
    }

    //Updates progressbar
    function progressBarFill(currentDuration, totalDuration) {
        var progressBar = $('#current-progress'),
            barSize = Math.round(currentDuration / totalDuration * 100 * 10) / 10;

        progressBar.css("width", barSize + "%");
    }

    //Toggle lyrics sidepanel visibility
    function toggleLyrics() {
        $('#lyrics-button').toggleClass("toggled-option-button");
        $('#sidebar-space').toggleClass("sidebar-space-show");
        $('#lyrics-wrapper').toggleClass("toggled-lyrics-slideover");
        if ($('#lyrics-wrapper').css('display') !== 'none') {
            if ($(window).width() <= 930) {
                $('main').hide();
            } else {
                $('main').show();
            }
        }
    }

    //Fetches and prints lyrics (and title) to the sidebar
    function fetchLyrics() {
        var title = $('.track' + lyricsPointer).parent().parent().find('.metaTitle').text(),
            lyrics = $('.track' + lyricsPointer).parent().parent().find('.track-lyrics').text();
        
        $('#lyrics-title').text("Lyrics - " + title);
        $('#lyrics').text(lyrics);
    }

    //Check if lyrics sidepanel is visible, displays it if not
    //Prints lyrics of the track requested in the list
    function checkLyricsAndPrint() {
        if (!$('#sidebar-space').hasClass('sidebar-space-show')) {
            toggleLyrics();
            fetchLyrics();
        } else {
            fetchLyrics();
        }
    }

    //Plays track or resets a track and plays it again
    function playOrRestart() {
        if ($('.track' + trackPointer).get(0).duration > 0 && !$('.track' + trackPointer).paused) {
            pauseCurrent();
            resetCurrent();
            playCurrent();
        } else {
            playCurrent();
        }
    }

    //Populate player information with current track information
    function populatePlayerInfo(dataArray) {
        $('#player-title').text(dataArray[0]);
        $('#lyrics-title').text("Lyrics - " + dataArray[0]);
        $('#player-artist').text(dataArray[1]);
        $('#lyrics').text(dataArray[2]);
        $('#player-cover').attr('src', dataArray[3]);
        $('#download-button').attr('download', dataArray[4]);
    }

    //Fetches information about the current playing song
    //NOTE: DOES NOT POPULATE/UPDATE DURATIONS IN PLAYER
    function fetchMetadata() {
        //Initialization
        var currentTrack = $('.track' + trackPointer),
            currentTitle,
            currentArtist,
            currentLyrics,
            currentCover,
            currentFile,
            currentDuration,
            dataArray = [];

        //Fetch and store values from DOM
        currentTitle    = currentTrack.parent().parent().find('.metaTitle').text();
        currentArtist   = currentTrack.parent().parent().find('.metaArtist').text();
        currentLyrics   = currentTrack.parent().parent().find('.track-lyrics').text();
        currentCover    = currentTrack.parent().parent().parent().find('.cover').attr('src');
        currentFile     = currentTrack.find('.track-file').attr('src');

        //Store fetched values in array
        dataArray = [
            currentTitle,
            currentArtist,
            currentLyrics,
            currentCover,
            currentFile
        ];

        populatePlayerInfo(dataArray);
    }

    /////PAGE RELATED CODE/////
    
    //Show main
    $('main').css('display', 'block');
    
    //Play tracks using play button in track header
    $('.play-button').click(function () {
        if (trackPointer === $(this).closest('.track-frame').find('.track-id').text()) {
            resetCurrent();
            return false;
        }
        
        trackPointer = $(this).closest('.track-frame').find('.track-id').text();
        lyricsPointer = trackPointer;
        fadeOutCoverBlur();
        fetchMetadata();
        showPlayer();
        pauseAll(trackCount);
        loadhandler(playOrRestart());
        
        timeInterval = setInterval(function () {
            updateDuration(timeInterval, trackCount);
        }, 50);
    });
    
    $('.lyrics-button').click(function () {
        preserveScroll = $(window).scrollTop();
        lyricsPointer = $(this).parent().parent().parent().parent().find('.track-id').text();

        checkLyricsAndPrint();
    });
    
    //Toggle Show Information menu pane
    $('.header-moreinfo-button').click(function () {
        //Prevent animation queueing
        if ($('.track-moreinfo-wrapper').is('.velocity-animating')) {
            return false;
        }
        
        if ($(this).val() === "Hide Information") {
            $(this).val("Show Information");
            $(this).parent().parent().parent().siblings().children().velocity('slideUp', { duration : 500 });
        } else {
            $(this).val("Hide Information");
            $(this).parent().parent().parent().siblings().children().velocity('slideDown', { duration : 500 });
        }
    });
    
    //Dismiss for lyrics sidepanel
    $('#lyrics-close-button').click(function () {
        toggleLyrics();
        $('main').show();
        $('html, body').scrollTop(preserveScroll);
        preserveScroll = 0;
    });
    
    /////PLAYER RELATED CODE/////
    
    //Volume Control
    $('#player-volume-slider').on('input', function () {
        $('.track').prop('volume', $(this).val());
        volumeIcon($(this).val());
    });
    
    $('#player-volume-slider').on('mouseup keyup', function () {
        createCookie('volume', $(this).val(), 14);
    });
    
    $('#player-volume-slider').on('mouseup', function () {
        setTimeout(function () {
            showVolumeSlider(false);
        }, 50);
    });
    
    $('#player-wrapper').on('mouseleave', function () {
        setTimeout(function () {
            showVolumeSlider(false);
        }, 50);
    });
    
    $('#player-volume-icon').click(function () {
        if ($('#player-volume-wrapper').is('.velocity-animating')) {
            return false;
        }
        
        if ($(this).hasClass('selected')) {
            showVolumeSlider(false);
        } else {
            showVolumeSlider(true);
        }
    });
    
    //Toggle Play / Pause
    $('#play-button').click(function () {
        loadhandler(playCurrent());
    });
    
    $('#pause-button').click(function () {
        fadeOutCoverBlur();
        pauseCurrent();
    });
    
    //Play previous / next tracks
    $('#prev-button').click(function () {        
        fadeOutCoverBlur();
        if ($('.track' + trackPointer).get(0).paused) {
            if (trackPointer < trackCount) {
                resetCurrent();
                trackPointer = trackPointer + 1;
                fetchMetadata();
            } else {
                resetCurrent();
            }
        } else {
            if (trackPointer < trackCount) {
                pauseCurrent();
                resetCurrent();
                trackPointer = trackPointer + 1;
                loadhandler(playCurrent());
                fetchMetadata();
            } else {
                resetCurrent();
                fadeInCoverBlur();
            }
        }
    });
    
    $('#next-button').click(function () {
        if ($('.track' + trackPointer).get(0).paused) {
            if (trackPointer > 1) {
                resetCurrent();
                trackPointer = trackPointer - 1;
                fetchMetadata();
            } else {
                resetCurrent();
                hidePlayer();
                clearInterval(timeInterval);
                $('#lyrics-button').removeClass("toggled-option-button");
                $('#sidebar-space').removeClass("sidebar-space-show");
                $('#lyrics-wrapper').removeClass("toggled-lyrics-slideover");
            }
        } else {
            if (trackPointer > 1) {
                fadeOutCoverBlur();
                pauseCurrent();
                resetCurrent();
                trackPointer = trackPointer - 1;
                loadhandler(playCurrent());
                showPauseButton();
                fetchMetadata();
            } else {
                pauseCurrent();
                resetCurrent();
                hidePlayer();
                clearInterval(timeInterval);
                fadeOutCoverBlur();
                $('#lyrics-button').removeClass("toggled-option-button");
                $('#sidebar-space').removeClass("sidebar-space-show");
                $('#lyrics-wrapper').removeClass("toggled-lyrics-slideover");
            }
        }
    });
    
    //Hide and show lyrics sidepanel and fetch lyrics of invoked track
    $('#lyrics-button').click(function () {
        if (preserveScroll === 0) {
            preserveScroll = $(window).scrollTop();
        }
        toggleLyrics();
        fetchLyrics();
        $('main').show();
        $('html, body').scrollTop(preserveScroll);
        preserveScroll = 0;
    });
    
    //Download button for player downloads current playing track
    $('#download-button').click(function () {
        $('.track' + trackPointer).parent().find('.download-button')[0].click();
    });
    
    //Toggle between remaining and total duration
    $('.player-duration-wrapper').click(function () {
        if ($('#remaining-duration').is(":visible")) {
            $('#remaining-duration').hide();
            $('#total-duration').show();
        } else {
            $('#remaining-duration').show();
            $('#total-duration').hide();
        }
    });

    //On play / pause adds Macbook Pro TouchBar support
    $('.track').on('pause', function () {
        showPlayButton();
    });
    
    $('.track').on('play', function () {
        showPauseButton();
    });
    
    //Prevents preloader from showing once content is loaded
    $('.track').on('canplaythrough', function () {
        $(this).addClass('loaded');
    });
    
    //Handling of keyboard presses
    $(document).on('keydown', function (e) {
        if (
            $('#player-wrapper').css('display') !== 'none' &&
                $('#dropdown-wrapper').css('display') === 'none' &&
                $('#contact-wrapper').css('display') === 'none' &&
                !$('#contact-wrapper').hasClass('contact-wrapper-minimized')
        ) {
            if (e.which === 32) {
                e.preventDefault();
                if ($('#player-volume-icon').hasClass('selected')) {
                    return false;
                }
                if ($('#play-button').css('display') !== 'none') {
                    showPauseButton();
                    loadhandler(playCurrent());
                    popnotify('_images/_popnotify/popnotify-play.png', 'Resumed', void 0, 750);
                } else {
                    showPlayButton();
                    pauseCurrent();
                    fadeOutCoverBlur();
                    popnotify('_images/_popnotify/popnotify-pause.png', 'Paused', void 0, 750);
                }
            }
        }
    });
    
    //Handling of resize
    $(window).resize(function () {
        if ($('#player-volume-icon').hasClass('selected')) {
            showVolumeSlider(false);
            $('#prev-button, #next-button').show();
            if ($('.track' + trackPointer)[0].paused) {
                $('#play-button').show();
            } else {
                $('#pause-button').show();
            }
        }
        
        if ($(window).width() > 1080) {
            $('main').show();
        } else {
            if ($('#lyrics-wrapper').css('display') === 'none') {
                $('main').show();
            } else {
                $('main').hide();
            }
        }
        
        if (($(window).width() > 1280) || ($(window).width() <= 1080 && $(window).width() > 850)) {
            $('#player-volume-wrapper').show().css('opacity', 1);
        }
        
        if (($(window).width() <= 1280 && $(window).width() > 1080) || $(window).width() <= 850) {
            $('#player-volume-wrapper').hide().css('opacity', 0);
        }
    });
    
    //Volume Handling
    if (document.cookie.indexOf('volume') >= 0) {
        $('.track').prop('volume', readCookie('volume'));
        $('#player-volume-slider').attr('value', readCookie('volume'));
    }
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.track').prop('volume', 1);
        $('#player-volume-slider').attr('value', 1);
        $('#player-volume-slider').remove();
        $('#player-volume-icon').remove();
    } else {
        volumeIcon($('#player-volume-slider').attr('value'));
        preload([
            "_images/_player/vol0.png",
            "_images/_player/vol1.png",
            "_images/_player/vol25.png",
            "_images/_player/vol50.png",
            "_images/_player/vol75.png"
        ]);
    }
    
    //Preload popnotify images
    preload([
        "_images/_popnotify/popnotify-pause.png",
        "_images/_popnotify/popnotify-play.png"
    ]);

});