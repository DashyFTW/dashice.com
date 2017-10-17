<div id="player-wrapper">
    <div id="player-tracker">
        <p id="player-title" class="unselectable">player-title</p>
        <p id="player-artist" class="unselectable">player-artist</p>
    </div>
    <div id="player-cover-wrapper">
        <img src="" alt="player cover" id="player-cover">
        <div>
            <img src="_images/_player/preloader.png" alt="preloader" id="player-preloader" class="rotating">
        </div>
    </div>

    <div id="media-controls-wrapper">
        <div id="media-progress">
            <div id="current-progress"></div>
        </div>

        <div id="media-elements">
            <div class="player-duration-wrapper">
                <p class="player-duration" id="current-duration">0:00</p>
            </div>
            <div class="player-options">
                <input type="button" value="Lyrics" id="lyrics-button" class="player-option-button">
            </div>
            <div class="player-flex-space" id="player-left-flex">
                <button id="player-volume-icon"></button>
                <div id="player-volume-wrapper">
                    <input type="range" id="player-volume-slider" min="0" max="1" value="0.75" step="0.01">
                </div>
            </div>
            <div id="player-media-controls">
                <img class="player-control" id="prev-button" src="_images/_player/prev-button.png" alt="previous">
                <img class="player-control" id="play-button" src="_images/_player/play-button.png" alt="play">
                <img class="player-control" id="pause-button" src="_images/_player/pause-button.png" alt="pause">
                <img class="player-control" id="next-button" src="_images/_player/next-button.png" alt="next">
            </div>
            <div class="player-flex-space" id="player-right-flex"></div>
            <div class="player-options">
                <input type="button" value="Download" id="download-button" class="player-option-button">
            </div>
            <div class="player-duration-wrapper">
                <p class="player-duration unselectable" id="remaining-duration">-0:00</p>
                <p class="player-duration unselectable" id="total-duration">0:00</p>
            </div>
        </div>
    </div>
</div>