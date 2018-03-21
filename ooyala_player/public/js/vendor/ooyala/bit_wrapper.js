(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// "OO" changed to OOV4

if (!OOV4)
{
  OOV4 = {};
}

},{}],2:[function(require,module,exports){
require("./InitOOUnderscore.js");

var hazmatConfig = {};

// 'debugHazmat' flag needs to be set before plugins are loaded. If we added
// this flag to the OOV4 namespace, it would be overriden during plugin initalization,
// so we need to use a global var instead
if (window && !window.debugHazmat) {
  hazmatConfig = {
    warn: function() { return; }
  };
}

if ((!OOV4.HM) && (typeof window === 'undefined' || typeof window._ === 'undefined'))
{
  OOV4.HM = require('hazmat').create(hazmatConfig);
}
else if (!window.Hazmat)
{
  require('hazmat');
}

if (!OOV4.HM)
{
  OOV4.HM = window.Hazmat.noConflict().create(hazmatConfig);
}

},{"./InitOOUnderscore.js":3,"hazmat":7}],3:[function(require,module,exports){
require("./InitOO.js");

if (!window._)
{
  window._ = require('underscore');
}

if (!OOV4._)
{
  OOV4._ = window._.noConflict();
}

},{"./InitOO.js":1,"underscore":8}],4:[function(require,module,exports){
  /**
   * @namespace OOV4
   */
  (function(OOV4,_){

    // External States
	/**
	 * @description The Ooyala Player run-time states apply to an Ooyala player while it is running. These states apply equally to both HTML5 and Flash players.
	 * State changes occur either through user interaction (for example, the user clickes the PLAY button), or programmatically via API calls. For more information,
	 * see <a href="http://support.ooyala.com/developers/documentation/api/pbv4_api_events.html" target="target">Player Message Bus Events</a>.
	 * @summary Represents the Ooyala Player run-time states.
	 * @namespace OOV4.STATE
	 */
    OOV4.STATE = {
      /** The embed code has been set. The movie and its metadata is currently being loaded into the player. */
      LOADING : 'loading',
      /**
       * One of the following applies:
       * <ul>
       *   <li>All of the necessary data is loaded in the player. Playback of the movie can begin.</li>
       *   <li>Playback of the asset has finished and is ready to restart from the beginning.</li>
       * </ul>
       */
      READY : 'ready',
      /** The player is currently playing video content. */
      PLAYING : 'playing',
      /** The player has currently paused after playback had begun. */
      PAUSED : 'paused',

      /** Playback has currently stopped because it doesn't have enough movie data to continue and is downloading more. */
      BUFFERING : 'buffering',
      /** The player has encountered an error that prevents playback of the asset. The error could be due to many reasons,
       * such as video format, syndication rules, or the asset being disabled. Refer to the list of errors for details.
       * The error code for the root cause of the error is available from the [OOV4.Player.getErrorCode()]{@link OOV4.Player#getErrorCode} method.
       */
      ERROR : 'error',
      /** The player has been destroyed via its [OOV4.Player.destroy(<i>callback</i>)]{@link OOV4.Player#destroy} method. */
      DESTROYED : 'destroyed',

      __end_marker : true
    };

    // All Events Constants
    /**
     * @description The Ooyala Player events are default events that are published by the event bus.Your modules can subscribe to any and all of these events.
     * Use message bus events to subscribe to or publish player events from video to ad playback. For more information,
     * see <a href="http://support.ooyala.com/developers/documentation/api/pbv4_api_events.html" target="target">Player Message Bus Events</a>.
     * @summary Represents the Ooyala Player events.
     * @namespace OOV4.EVENTS
     */
    OOV4.EVENTS = {

     /**
      * A player was created. This is the first event that is sent after player creation.
      * This event provides the opportunity for any other modules to perform their own initialization.
      * The handler is called with the query string parameters.
      * The DOM has been created at this point, and plugins may make changes or additions to the DOM.<br/><br/>
      *
      *
      * @event OOV4.EVENTS#PLAYER_CREATED
      */
      PLAYER_CREATED : 'playerCreated',

      PLAYER_EMBEDDED: 'playerEmbedded',

      /**
       * An attempt has been made to set the embed code.
       * If you are developing a plugin, reset the internal state since the player is switching to a new asset.
       * Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The ID (embed code) of the asset.</li>
       *     <li>The ID (embed code) of the asset, with options.</li>
       *   </ul>
       *
       *
       * @event OOV4.EVENTS#SET_EMBED_CODE
       */
      SET_EMBED_CODE : 'setEmbedCode',

      /**
       * An attempt has been made to set the embed code by Ooyala Ads.
       * If you are developing a plugin, reset the internal state since the player is switching to a new asset.
       * Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The ID (embed code) of the asset.</li>
       *     <li>The ID (embed code) of the asset, with options.</li>
       *   </ul>
       *
       *
       * @event OOV4.EVENTS#SET_EMBED_CODE_AFTER_OOYALA_AD
       * @private
       */
      SET_EMBED_CODE_AFTER_OOYALA_AD : 'setEmbedCodeAfterOoyalaAd',

      /**
       * The player's embed code has changed. The handler is called with two parameters:
       * <ul>
       *    <li>The ID (embed code) of the asset.</li>
       *    <li>The options JSON object.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#EMBED_CODE_CHANGED
       */
      EMBED_CODE_CHANGED : 'embedCodeChanged',

      /**
       * An attempt has been made to set a new asset.
       * If you are developing a plugin, reset the internal state since the player is switching to a new asset.
       * Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The asset Object</li>
       *     <li>The asset Object, with options.</li>
       *   </ul>
       *
       * <h5>Compatibility: </h5>
       * <p style="text-indent: 1em;">HTML5, Flash</p>
       *
       * @event OOV4.EVENTS#SET_ASSET
       */
      SET_ASSET: 'setAsset',

      /**
       * A new asset has been specified to for playback and has basic passed validation.
       * The handler will be called with an object representing the new asset.
       * The object will have the following structure:
       *   <ul>
       *     <li>{
       *           Content:
       *           <ul>
       *                 <li>title: String,</li>
       *                 <li>description: String,</li>
       *                 <li>duration: Number,</li>
       *                 <li>posterImages: Array,</li>
       *                 <li>streams: Array,</li>
       *                 <li>captions: Array</li>
       *           </ul>
       *     }</li>
       *
       *   </ul>
       *
       * <h5>Compatibility: </h5>
       * <p style="text-indent: 1em;">HTML5, Flash</p>
       *
       * @event OOV4.EVENTS#ASSET_CHANGED
       */
      ASSET_CHANGED: 'assetChanged',

      /**
       * An attempt has been made to update current asset for cms-less player.
       * The handler is called with:
       *   <ul>
       *     <li>The asset Object, with optional fields populated</li>
       *   </ul>
       *
       *
       * @event OOV4.EVENTS#UPDATE_ASSET
       * @public
       */
      UPDATE_ASSET: 'updateAsset',

      /**
       * New asset parameters were specified for playback and have passed basic validation.
       * The handler will be called with an object representing the new parameters.
       * The object will have the following structure:
       *   <ul> {
       *     <li> id: String </li>
       *     <li> content:
       *           <ul>
       *                 <li>title: String,</li>
       *                 <li>description: String,</li>
       *                 <li>duration: Number,</li>
       *                 <li>posterImages: Array,</li>
       *                 <li>streams: Array,</li>
       *                 <li>captions: Array</li>
       *           </ul>
       *     </li>
       *     <li> relatedVideos:
       *           <ul>
       *                 <li>title: String,</li>
       *                 <li>description: String,</li>
       *                 <li>thumbnailUrl: String,</li>
       *                 <li>asset: Object</li>
       *           </ul>
       *     </li>
       *   }</ul>
       *
       * <h5>Compatibility: </h5>
       * <p style="text-indent: 1em;">HTML5, Flash</p>
       *
       * @event OOV4.EVENTS#ASSET_UPDATED
       */
      ASSET_UPDATED: 'assetUpdated',

      /**
       * An <code>AUTH_TOKEN_CHANGED</code> event is triggered when an authorization token is issued by the Player Authorization API.<br/>
       * For example, in device registration, an authorization token is issued, as described in
       * <a href="http://support.ooyala.com/developers/documentation/concepts/device_registration.html" target="target">Device Registration</a>.
       * The handler is called with a new value for the authorization token.<br/><br/>
       *
       *
       * @event OOV4.EVENTS#AUTH_TOKEN_CHANGED
       */
      AUTH_TOKEN_CHANGED: "authTokenChanged",

      /**
       * The GUID has been set. The handler is called with the GUID.
       * <p>This event notifies plugin or page developers that a unique ID has been either generated or loaded for the current user's browser.
       * This is useful for analytics.</p>
       * <p>In HTML5, Flash, and Chromecast environments, a unique user is identified by local storage or a cookie. </p>
       * <p>To generate the GUID, Flash players use the timestamp indicating when the GUID is generated, and append random data to it.
       * The string is then converted to base64.</p>
       * <p>To generate the GUID, HTML5 players use the current time, browser
       * information, and random data and hash it and convert it to base64.</p>
       * <p>Within the same browser on the desktop, once a GUID is set by one platform
       * it is used for both platforms for the user. If a user clears their browser cache, that user's (device's) ID will be regenerated the next time
       * they watch video. Incognito modes will track a user for a single session, but once the browser is closed the GUID is erased.</p>
       * <p>For more information, see <b>unique user</b> <a href="http://support.ooyala.com/users/users/documentation/reference/glossary.html" target="target">Glossary</a>.</p>
       *
       *
       * @event OOV4.EVENTS#GUID_SET
       */
      GUID_SET: 'guidSet',

      WILL_FETCH_PLAYER_XML: 'willFetchPlayerXml',
      PLAYER_XML_FETCHED: 'playerXmlFetched',
      WILL_FETCH_CONTENT_TREE: 'willFetchContentTree',

      SAVE_PLAYER_SETTINGS: 'savePlayerSettings',

      /**
       * A content tree was fetched. The handler is called with a JSON object that represents the content data for the current asset.<br/><br/>
       *
       *
       * <h5>Analytics:</h5>
       * <p style="text-indent: 1em;">Records a <code>display</code> event. For more information see
       * <a href="http://support.ooyala.com/developers/documentation/concepts/analytics_plays-and-displays.html" target="target">Displays, Plays, and Play Starts</a>.</p>
       *
       * @event OOV4.EVENTS#CONTENT_TREE_FETCHED
       */
      CONTENT_TREE_FETCHED: 'contentTreeFetched',

      WILL_FETCH_METADATA: 'willFetchMetadata',

      /**
       * The metadata, which is typically set in Backlot, has been retrieved.
       * The handler is called with the JSON object containing all metadata associated with the current asset.
       * The metadata includes page-level, asset-level, player-level, and account-level metadata, in addition to
       * metadata specific to 3rd party plugins. This is typically used for ad and anlytics plugins, but can be used
       * wherever you need specific logic based on the asset type.<br/><br/>
       *
       *
       * @event OOV4.EVENTS#METADATA_FETCHED
       */
      METADATA_FETCHED: 'metadataFetched',

      /**
       * The skin metadata, which is set in Backlot, has been retrieved.
       * The handler is called with the JSON object containing metadata set in Backlot for the current asset.
       * This is used by the skin plug-in to deep merge with the embedded skin config.<br/><br/>
       *
       * @event OOV4.EVENTS#SKIN_METADATA_FETCHED
       */
      SKIN_METADATA_FETCHED: 'skinMetadataFetched',

      /**
       * The thumbnail metadata needed for thumbnail previews while seeking has been fetched and will be
       * passed through to the event handlers subscribing to this event.
       * Thumbnail metadata will have the following structure:
       * {
          data: {
            available_time_slices: [10],  //times that have thumbnails available
            available_widths: [100],       //widths of thumbnails available
            thumbnails: {
                  10: {100: {url: http://test.com, height: 100, width: 100}}
            }
          }
        }
       * <br/><br/>
       *
       *
       * @event OOV4.EVENTS#THUMBNAILS_FETCHED
       * @public
       */
      THUMBNAILS_FETCHED: 'thumbnailsFetched',

      WILL_FETCH_AUTHORIZATION: 'willFetchAuthorization',

      /**
       * Playback was authorized. The handler is called with an object containing the entire SAS response, and includes the value of <code>video_bitrate</code>.
       * <p>For more information see
       * <a href="http://support.ooyala.com/developers/documentation/concepts/encodingsettings_videobitrate.html" target="target">Video Bit Rate</a>.</p>
       *
       *
       * @event OOV4.EVENTS#AUTHORIZATION_FETCHED
       */
      AUTHORIZATION_FETCHED: 'authorizationFetched',

      WILL_FETCH_AD_AUTHORIZATION: 'willFetchAdAuthorization',
      AD_AUTHORIZATION_FETCHED: 'adAuthorizationFetched',

      CAN_SEEK: 'canSeek',
      WILL_RESUME_MAIN_VIDEO: 'willResumeMainVideo',

      /**
       * The player has indicated that it is in a playback-ready state.
       * All preparations are complete, and the player is ready to receive playback commands
       * such as play, seek, and so on. The default UI shows the <b>Play</b> button,
       * displaying the non-clickable spinner before this point. <br/><br/>
       *
       *
       * @event OOV4.EVENTS#PLAYBACK_READY
       */
      PLAYBACK_READY: 'playbackReady',

      /**
       * Play has been called for the first time. <br/><br/>
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The unix timestamp of the initial playtime</li>
       *   <li>True if the playback request was the result of an autoplay, false or undefined otherwise</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#INITIAL_PLAY
       * @public
       */
      INITIAL_PLAY: "initialPlay", // when play is called for the very first time ( in start screen )

      WILL_PLAY : 'willPlay',


      /** The user has restarted the playback after the playback finished */
      REPLAY : 'replay',

      /**
       * The playhead time changed. The handler is called with the following arguments:
       * <ul>
       *   <li>The current time.</li>
       *   <li>The duration.</li>
       *   <li>The name of the buffer.</li>
       *   <li>The seek range.</li>
       *   <li>The id of the video (as defined by the module that controls it).</li>
       * </ul>
       *
       *
       * <h5>Analytics:</h5>
       * <p style="text-indent: 1em;">The first event is <code>video start</code>. Other instances of the event feed the <code>% completed data points</code>.</p>
       * <p style="text-indent: 1em;">For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/analytics_plays-and-displays.html">Displays, Plays, and Play Starts</a>.</p>
       *
       * @event OOV4.EVENTS#PLAYHEAD_TIME_CHANGED
       */
      PLAYHEAD_TIME_CHANGED: 'playheadTimeChanged',

      /**
       * The player is buffering the data stream.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The url of the video that is buffering.</li>
       *   <li>The playhead position.</li>
       *   <li>The id of the video that is buffering (as defined by the module that controls it).</li>
       * </ul><br/><br/>
       *
       *
       * @event OOV4.EVENTS#BUFFERING
       */
      BUFFERING: 'buffering', // playing stops because player is buffering

      /**
       * Play resumes because the player has completed buffering. The handler is called with the URL of the stream.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The url of the video that has buffered.</li>
       *   <li>The id of the video that has buffered (as defined by the module that controls it).</li>
       * </ul><br/><br/>
       *
       *
       * @event OOV4.EVENTS#BUFFERED
       */
      BUFFERED: 'buffered',

      /**
       * The player is downloading content (it can play while downloading).
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The current time.</li>
       *   <li>The duration.</li>
       *   <li>The name of the buffer.</li>
       *   <li>The seek range.</li>
       *   <li>The id of the video (as defined by the module that controls it).</li>
       * </ul>
       * <br/><br/>
       *
       *
       * @event OOV4.EVENTS#DOWNLOADING
       */
      DOWNLOADING:  'downloading', // player is downloading content (could be playing while downloading)

      /**
       * Lists the available bitrate information. The handler is called with an array containing the available streams, each object includes:
       *   <ul>
       *     <li>bitrate: The bitrate in bits per second. (number|string)</li>
       *     <li>height: The vertical resolution of the stream. (number)</li>
       *     <li>width: The horizontal resolution of the stream. (number)</li>
       *   </ul>
       * If The video plugin supports automatic ABR, one stream will have a bitrate value of "auto".
       *
       * <p>For more information see
       * <a href="http://support.ooyala.com/developers/documentation/concepts/encodingsettings_videobitrate.html" target="target">Video Bit Rate</a>.</p>
       * @event OOV4.EVENTS#BITRATE_INFO_AVAILABLE
       * @public
       */
      BITRATE_INFO_AVAILABLE: 'bitrateInfoAvailable',

      /**
       * A request to set a specific stream bitrate has occurred.
       * The method is published with an object representing the stream to switch to. This will
       * be one of the stream objects published in BITRATE_INFO_AVAILABLE. Each object includes:
       *   <ul>
       *     <li>bitrate: The bitrate in bits per second. (number|string)</li>
       *     <li>height: The vertical resolution of the stream. (number)</li>
       *     <li>width: The horizontal resolution of the stream. (number)</li>
       *   </ul>
       * <br/><br/>
       *
       * @event OOV4.EVENTS#SET_TARGET_BITRATE
       */
      SET_TARGET_BITRATE: 'setTargetBitrate',

      /**
       * The current playing bitrate has changed. The handler is called with the stream object which includes:
       *   <ul>
       *     <li>bitrate: The bitrate in bits per second. (number|string)</li>
       *     <li>height: The vertical resolution of the stream. (number)</li>
       *     <li>width: The horizontal resolution of the stream. (number)</li>
       *   </ul>
       * If the player is using automatic ABR, it should publish a stream object with the bitrate set to "auto".
       *
       * <p>For more information see
       * <a href="http://support.ooyala.com/developers/documentation/concepts/encodingsettings_videobitrate.html" target="target">Video Bit Rate</a>.</p>
       * @event OOV4.EVENTS#BITRATE_CHANGED
       * @public
       */
      BITRATE_CHANGED: 'bitrateChanged',

      CLOSED_CAPTIONS_INFO_AVAILABLE: 'closedCaptionsInfoAvailable',
      SET_CLOSED_CAPTIONS_LANGUAGE: 'setClosedCaptionsLanguage',
      CLOSED_CAPTION_CUE_CHANGED: 'closedCaptionCueChanged',

      /**
       * Raised when asset dimensions become available.
       *
       * Provide the following arguments in an object:
       * <ul>
       *   <li>width: the width of the asset (number)
       *   </li>
       *   <li>height: the height of the asset (number)
       *   </li>
       *   <li>videoId: the id of the video (string)
       *   </li>
       * </ul>
       *
       * @event OOV4.EVENTS#ASSET_DIMENSION
       * @public
       */
      ASSET_DIMENSION: 'assetDimension',

      SCRUBBING: 'scrubbing',
      SCRUBBED: 'scrubbed',

      /**
       * A request to perform a seek has occurred. The playhead is requested to move to
       * a specific location, specified in milliseconds. The handler is called with the position to which to seek.<br/><br/>
       *
       *
       * @event OOV4.EVENTS#SEEK
       */
      SEEK: 'seek',

      /**
       * The player has finished seeking the main video to the requested position.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The current time of the video after seeking.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#SEEKED
       */
      SEEKED: 'seeked',

      /**
       * A playback request has been made. <br/><br/>
       *
       *
       * @event OOV4.EVENTS#PLAY
       */
      PLAY: 'play',

      PLAYING: 'playing',
      PLAY_FAILED: 'playFailed',

      /**
       * A player pause has been requested. <br/><br/>
       *
       *
       * @event OOV4.EVENTS#PAUSE
       */
      PAUSE: 'pause',

      /**
       * The player was paused. <br/><br/>
       *
       *
       * @event OOV4.EVENTS#PAUSED
       */
      PAUSED: 'paused',

      /**
       * The video and asset were played. The handler is called with the arguments that were passed.<br/><br/>
       *
       *
       * @event OOV4.EVENTS#PLAYED
       */
      PLAYED: 'played',

      DISPLAY_CUE_POINTS: 'displayCuePoints',
      INSERT_CUE_POINT: 'insertCuePoint',
      RESET_CUE_POINTS: 'resetCuePoints',

      /**
       * This event is triggered before a change is made to the full screen setting of the player.
       * The handler is called with <code>true</code> if the full screen setting will be enabled,
       * and is called with <code>false</code> if the full screen setting will be disabled.
       *
       *
       * @event OOV4.EVENTS#WILL_CHANGE_FULLSCREEN
       */
      WILL_CHANGE_FULLSCREEN: 'willChangeFullscreen',

      /**
       * The fullscreen state has changed. Depending on the context, the handler is called with:
       * <ul>
       *   <li><code>isFullscreen</code> and <code>paused</code>:</li>
       *     <ul>
       *       <li><code>isFullscreen</code> is set to <code>true</code> or <code>false</code>.</li>
       *       <li><code>isFullscreen</code> and <code>paused</code> are each set to <code>true</code> or <code>false</code>.</li>
       *     </ul>
       *   </li>
       *   <li>The id of the video that has entered fullscreen (as defined by the module that controls it).
       * </ul>
       *
       *
       * @event OOV4.EVENTS#FULLSCREEN_CHANGED
       */
      FULLSCREEN_CHANGED: 'fullscreenChanged',

      /**
       * The screen size has changed. This event can also be triggered by a screen orientation change for handheld devices.
       * Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The width of the player.</li>
       *     <li>The height of the player.</li>
       *   </ul>
       *
       *
       * @event OOV4.EVENTS#SIZE_CHANGED
       */
      SIZE_CHANGED: 'sizeChanged',

      /**
       * A request to change volume has been made.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The desired volume of the video element.</li>
       *   <li>The id of the video on which to change the volume (as defined by the module that controls it).
       *        If null or undefined, all video elements volume will be changed</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#CHANGE_VOLUME
       */
      CHANGE_VOLUME: 'changeVolume',

      /**
       * The volume has changed. The handler is called with the current volume, which has a value between 0 and 1, inclusive.<br/><br/>
       *
       *
       * @event OOV4.EVENTS#VOLUME_CHANGED
       */
      VOLUME_CHANGED: 'volumeChanged',

      /**
       * A request to change the mute state has been made.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The desired mute state of the video element.</li>
       *   <li>The id of the video on which to mute (as defined by the module that controls it).
       *        If null or undefined, all video elements volume will be changed</li>
       *   <li>Whether or not the request was from a user action. True if it was from a user action,
       *        false otherwise.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#CHANGE_MUTE_STATE
       * @public
       */
      CHANGE_MUTE_STATE: 'changeMuteState',

      /**
       * The mute state has changed.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The current mute state of the video element.</li>
       *   <li>The id of the video that was muted (as defined by the module that controls it).</li>
       *   <li>Whether or not the mute state was changed for muted autoplay. True if it was
       *        done for muted autoplay, false or undefined otherwise.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#MUTE_STATE_CHANGED
       * @public
       */
      MUTE_STATE_CHANGED: 'muteStateChanged',

      /**
       * Controls are shown.<br/><br/>
       *
       *
       * @event OOV4.EVENTS#CONTROLS_SHOWN
       */
      CONTROLS_SHOWN: 'controlsShown',

      /**
       * Controls are hidden.<br/><br/>
       *
       *
       * @event OOV4.EVENTS#CONTROLS_HIDDEN
       */
      CONTROLS_HIDDEN: 'controlsHidden',
      END_SCREEN_SHOWN: 'endScreenShown',

      /**
       * An error has occurred. The handler is called with a JSON object that always includes an error code field,
       * and may also include other error-specific fields.<br/><br/>
       *
       *
       * @event OOV4.EVENTS#ERROR
       */
      ERROR: 'error',
      
      /**
       * An api related error has occurred. The handler is called with the following arguments:
       * <ul>
       *   <li>The error code.</li>
       *   <li>The error message.</li>
       *   <li>The url requested.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#API_ERROR
       * @public
       */
      API_ERROR: 'apiError',

      /**
       * Event containing the bitrate used at the start of playback. The handler is called with the following arguments:
       * <ul>
       *   <li>The bitrate in kbps.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#BITRATE_INITIAL
       * @public
       */
      BITRATE_INITIAL: 'bitrateInitial',

      /**
       * Event containing the bitrate used five seconds into playback. The handler is called with the following arguments:
       * <ul>
       *   <li>The bitrate in kbps.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#BITRATE_FIVE_SEC
       * @public
       */
      BITRATE_FIVE_SEC: 'bitrateFiveSec',

      /**
       * Event containing the bitrate used thirty seconds into playback. The handler is called with the following arguments:
       * <ul>
       *   <li>The bitrate in kbps.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#BITRATE_STABLE
       * @public
       */
      BITRATE_STABLE: 'bitrateStable',

      /**
       * A playback error has occurred before the video start. The handler is called with the following arguments:
       * <ul>
       *   <li>The error code.</li>
       *   <li>The error message.</li>
       *   <li>The la url if DRM used.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#PLAYBACK_START_ERROR
       * @public
       */
      PLAYBACK_START_ERROR: 'playbackStartError',

      /**
       * A playback error has occurred midstream. The handler is called with the following arguments:
       * <ul>
       *   <li>The error code.</li>
       *   <li>The error message.</li>
       *   <li>The playhead position.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#PLAYBACK_MIDSTREAM_ERROR
       * @public
       */
      PLAYBACK_MIDSTREAM_ERROR: 'playbackMidstreamError',
 
      /**
       * A plugin has been loaded successfully. The handler is called with the following arguments:
       * <ul>
       *   <li>The player core version.</li>
       *   <li>The plugin type: ad, video, analytics, playtest, skin.</li>
       *   <li>The plugin name.</li>
       *   <li>The time it took to load the plugin.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#PLAYBACK_MIDSTREAM_ERROR
       * @public
       */
      PLUGIN_LOADED: 'pluginLoaded',

      /**
       * The video plugin has sent an error message. The handler is called with the following arguments:
       * <ul>
       *   <li>The error code.</li>
       *   <li>The error message.</li>
       * </ul>
       *
       *
       * @event OOV4.EVENTS#VC_PLUGIN_ERROR
       * @public
       */
      VC_PLUGIN_ERROR: 'videoPluginError',

      /**
       * The player is currently being destroyed, and anything created by your module must also be deleted.
       * After the destruction is complete, there is nothing left to send an event.
       * Any plugin that creates or has initialized any long-living logic should listen to this event and clean up that logic.
       * <br/><br/>
       *
       *
       * @event OOV4.EVENTS#DESTROY
       */
      DESTROY: 'destroy',

      WILL_PLAY_FROM_BEGINNING: 'willPlayFromBeginning',

      DISABLE_PLAYBACK_CONTROLS: 'disablePlaybackControls',
      ENABLE_PLAYBACK_CONTROLS: 'enablePlaybackControls',


      // Video Controller action events

      /*
       * Denotes that the video controller is ready for playback to be triggered.
       * @event OOV4.EVENTS#VC_READY
       * @public
       */
      VC_READY: 'videoControllerReady',

      /**
       * Commands the video controller to create a video element.
       * It should be given the following arguments:
       * <ul>
       *   <li>videoId (string)
       *   </li>
       *   <li>streams (object) containing:
       *     <ul>
       *       <li>Encoding type (string) as key defined in OOV4.VIDEO.ENCODINGS
       *       </li>
       *       <li>Key-value pair (object) as value containing:
       *         <ul>
       *           <li>url (string): Url of the stream</li>
       *           <li>drm (object): Denoted by type of DRM with data as value object containing:
       *             <ul>
       *               <li>Type of DRM (string) as key (ex. "widevine", "fairplay", "playready")</li>
       *               <li>DRM specific data (object) as value</li>
       *             </ul>
       *           </li>
       *         </ul>
       *       </li>
       *     </ul>
       *   </li>
       *   <li>parentContainer of the element. This is a jquery element. (object)
       *   </li>
       *   <li>optional params object (object) containing:
       *     <ul>
       *       <li>closedCaptions: The possible closed captions available on this video. (object)</li>
       *       <li>crossorigin: The crossorigin attribute value to set on the video. (string)</li>
       *       <li>technology: The core video technology required (string) (ex. OOV4.VIDEO.TECHNOLOGY.HTML5)</li>
       *       <li>features: The video plugin features required (string) (ex. OOV4.VIDEO.FEATURE.CLOSED_CAPTIONS)</li>
       *     </ul>
       *   </li>
       * </ul>
       * @event OOV4.EVENTS#VC_CREATE_VIDEO_ELEMENT
       */
      VC_CREATE_VIDEO_ELEMENT: 'videoControllerCreateVideoElement',

      /**
       * A message to be interpreted by the Video Controller to update the URL of the stream for an element.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The name of the element who's URL is being altered</li>
       *   <li>The new url to be used</li>
       * </ul>
       * @event OOV4.EVENTS#VC_UPDATE_ELEMENT_STREAM
       * @public
       */
      VC_UPDATE_ELEMENT_STREAM: 'videoControllerUpdateElementStream',

      /**
       * The Video Controller has created the desired video element, as denoted by id (string).
       * The handler is called with the following arguments:
       * <ul>
       *   <li>Object containing:
       *     <ul>
       *       <li>videoId: The id of the video as defined by the module that controls it.</li>
       *       <li>encodings: The encoding types supported by the new video element.</li>
       *       <li>parent: The parent element of the video element.</li>
       *       <li>domId: The DOM id of the video element.</li>
       *       <li>videoElement: The video element or its wrapper as created by the video plugin.</li>
       *     </ul>
       *   </li>
       * </ul>
       * @event OOV4.EVENTS#VC_VIDEO_ELEMENT_CREATED
       */
      VC_VIDEO_ELEMENT_CREATED: 'videoControllerVideoElementCreated',

      /**
       * Commands the Video Controller to bring a video element into the visible range given the video element id (string).
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video to focus (as defined by the module that controls it).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_FOCUS_VIDEO_ELEMENT
       */
      VC_FOCUS_VIDEO_ELEMENT: 'videoControllerFocusVideoElement',

      /**
       * The Video Controller has moved a video element (string) into focus.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that is in focus (as defined by the module that controls it).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_VIDEO_ELEMENT_IN_FOCUS
       */
      VC_VIDEO_ELEMENT_IN_FOCUS: 'videoControllerVideoElementInFocus',

      /**
       * The Video Controller has removed a video element (string) from focus.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that lost focus (as defined by the module that controls it).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_VIDEO_ELEMENT_LOST_FOCUS
       */
      VC_VIDEO_ELEMENT_LOST_FOCUS: 'videoControllerVideoElementLostFocus',

      /**
       * Commands the Video Controller to dispose a video element given the video element id (string).
       * @event OOV4.EVENTS#VC_DISPOSE_VIDEO_ELEMENT
       */
      VC_DISPOSE_VIDEO_ELEMENT: 'videoControllerDisposeVideoElement',

      /**
       * The Video Controller has disposed the denoted video element (string).
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that was disposed (as defined by the module that controls it).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_VIDEO_ELEMENT_DISPOSED
       */
      VC_VIDEO_ELEMENT_DISPOSED: 'videoControllerVideoElementDisposed',

      /**
       * Commands the video controller to set the stream for a video element.
       * It should be given the video element name (string) and an object of streams denoted by encoding type (object).
       * @event OOV4.EVENTS#VC_SET_VIDEO_STREAMS
       */
      VC_SET_VIDEO_STREAMS: 'videoControllerSetVideoStreams',

      /**
       * The Video Controller has encountered an error attempting to configure video elements.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that encountered the error (as defined by the module that controls it).</li>
       *   <li>The error details (object) containing an error code.</li>
       * @event OOV4.EVENTS#VC_ERROR
       */
      VC_ERROR: 'videoControllerError',


      // Video Player action events

      /**
       * Sets the video element's initial playback time.
       * @event OOV4.EVENTS#VC_SET_INITIAL_TIME
       */
      VC_SET_INITIAL_TIME: 'videoSetInitialTime',

      /**
       * Commands the video element to play.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video to play (as defined by the module that controls it).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_PLAY
       */
      VC_PLAY: 'videoPlay',

      /**
        * Notifies the video element to play.
        * The handler is called with the following arguments:
        * <ul>
        *   <li>The id of the video to play (as defined by the module that controls it).</li>
        * </ul>
        * @event OOV4.EVENTS#PLAY_VIDEO_ELEMENT
        * @private
        */
      PLAY_VIDEO_ELEMENT: 'playVideoElement',

      /**
       * The video element has detected a command to play and will begin playback.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video to seek (as defined by the module that controls it).</li>
       *   <li>The url of the video that will play.</li>
       * </ul>
       * @event OOV4.EVENTS#VC_WILL_PLAY
       */
      VC_WILL_PLAY: 'videoWillPlay',

      /**
       * The video element has detected playback in progress.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that is playing (as defined by the module that controls it).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_PLAYING
       */
      VC_PLAYING: 'videoPlaying',

      /**
       * The video element has detected playback completion.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that has played (as defined by the module that controls it).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_PLAYED
       */
      VC_PLAYED: 'videoPlayed',

      /**
       * The video element has detected playback failure.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that has played (as defined by the module that controls it).</li>
       *   <li>The error code of the failure (string).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_PLAY_FAILED
       */
      VC_PLAY_FAILED: 'videoPlayFailed',

      /**
       * Commands the video element to pause.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video to pause (as defined by the module that controls it).</li>
       *   <li>Optional string indicating the reason for the pause.  Supported values include:
       *     <ul>
       *       <li>"transition" indicates that a pause was triggered because a video is going into or out of focus.</li>
       *       <li>null or undefined for all other cases.</li>
       *     </ul>
       *   </li>
       * </ul>
       * @event OOV4.EVENTS#VC_PAUSE
       */
      VC_PAUSE: 'videoPause',

      /**
       * The video element has detected video state change to paused.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that has paused (as defined by the module that controls it).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_PAUSED
       */
      VC_PAUSED: 'videoPaused',

      /**
       * Commands the video element to seek.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video to seek (as defined by the module that controls it).</li>
       *   <li>The time position to seek to (in seconds).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_SEEK
       */
      VC_SEEK: 'videoSeek',

      /**
       * The video element has detected seeking.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that is seeking (as defined by the module that controls it).</li>
       * </ul>
       * @event OOV4.EVENTS#VC_SEEKING
       */
      VC_SEEKING: 'videoSeeking',

      /**
       * The video element has detected seeked.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that has seeked (as defined by the module that controls it).</li>
       *   <li>The current time of the video after seeking.</li>
       * </ul>
       * @event OOV4.EVENTS#VC_SEEKED
       */
      VC_SEEKED: 'videoSeeked',

      /**
       * Commands the video element to preload.
       * @event OOV4.EVENTS#VC_PRELOAD
       */
      VC_PRELOAD: 'videoPreload',

      /**
       * Commands the video element to reload.
       * @event OOV4.EVENTS#VC_RELOAD
       */
      VC_RELOAD: 'videoReload',

      /**
       * Commands the video controller to prepare all video elements for playback.  This event should be
       * called on a click event and used to enable api-control on html5-based video elements.
       * @event OOV4.EVENTS#VC_PRIME_VIDEOS
       * @public
       */
      VC_PRIME_VIDEOS: 'videoPrimeVideos',

      /**
       * Notifies the player of tags (such as ID3) encountered during video playback.
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The id of the video that has paused (as defined by the module that controls it). (string)</li>
       *   <li>The type of metadata tag found, such as ID3. (string)</li>
       *   <li>The metadata. (string|object)</li>
       * </ul>
       * @event OOV4.EVENTS#VC_TAG_FOUND
       * @public
       */
      VC_TAG_FOUND: 'videoTagFound',

      /**
       * Notifies the player that the initial playback of content has started.
       * <ul>
       *   <li>The time since the initial play request was made (number)</li>
       *   <li>Boolean parameter. True if video was autoplayed, false otherwise (boolean)</li>
       *   <li>Boolean parameter. True if the video had an ad play before it started.
       *       This includes midrolls that play before content due to an initial playhead time > 0. 
       *       False otherwise  (number)</li>(boolean)</li>
       *   <li>The initial position of the playhead upon playback start. (number)</li>
       *   <li>The video plugin used for playback (string)</li>
       *   <li>The browser technology used - HTML5, Flash, Mixed, or Other (string)</li>
       *   <li>The stream encoding type, i.e. MP4, HLS, Dash, etc. (string)</li>
       *   <li>The URL of the content being played (string)</li>
       *   <li>The DRM being used, none if there is no DRM (string)</li>
       *   <li>Boolean parameter. True if a live stream is playing. False if VOD.(boolean)</li>
       * </ul>
       * @event OOV4.EVENTS#INITIAL_PLAY_STARTING
       * @public
       */
      INITIAL_PLAY_STARTING: 'initialPlayStarting',

      /**
       * This event is triggered when an ad sdk has been loaded successfully. The handler is called with:
       * <ul>
       *   <li>The ad plugin loaded.</li>
       * </ul>
       * @event OOV4.EVENTS#AD_SDK_LOADED
       */
      AD_SDK_LOADED: 'adSdkLoaded',

      /**
       * This event is triggered when there is an failure to load the ad sdk.       
       * The handler is called with the following arguments: 
       * <ul>
       *   <li>The ad plugin that failed to load.</li>
       *   <li>The player core version.</li>
       *   <li>The error message associated with the load failure.</li>
       * </ul>
       * @event OOV4.EVENTS#AD_SDK_LOAD_FAILED
       */
      AD_SDK_LOAD_FAILED: 'adSdkLoadFailed',

      /**
       * This event is triggered whenever an ad is requested. 
       * The handler is called with the following arguments:
       * <ul>
       *   <li>The ad plugin.</li>
       *   <li>The time the ad was scheduled to play.</li>
       * </ul>
       * @event OOV4.EVENTS#AD_REQUEST
       */
      AD_REQUEST: 'adRequest',

      /**
       * This event is triggered upon receiving a successful response for an ad request. 
       * The handler is called with the following arguments:       
       * <ul>
       *   <li>The ad plugin.</li>
       *   <li>The time the ad was scheduled to play.</li>
       *   <li>The ad request response time.</li>
       *   <li>Time from initial play to ad request success</li>
       * </ul>
       * @event OOV4.EVENTS#AD_REQUEST_SUCCESS
       */
      AD_REQUEST_SUCCESS: 'adRequestSuccess',

      /**
       * This event is triggered upon receiving an error for an ad request.       
       * The handler is called with the following arguments: 
       * <ul>
       *   <li>The ad plugin.</li>
       *   <li>The time the ad was scheduled to play.</li>
       *   <li>The final ad tag after macro substitution</li>
       *   <li>The error code.</li>
       *   <li>The error message.</li>
       *   <li>If there was a request timeout or not.</li>
       * </ul>
       * @event OOV4.EVENTS#AD_REQUEST_ERROR
       */
      AD_REQUEST_ERROR: 'adRequestError',


      /**
       * This event is triggered upon receiving an empty response for an ad request.
       * The handler is called with the following arguments:        
       * <ul>
       *   <li>The ad plugin.</li>
       *   <li>The time the ad was scheduled to play.</li>
       *   <li>The final ad tag after macro substitution</li>
       *   <li>The error code.</li>
       *   <li>The error message.</li>
       * </ul>
       * @event OOV4.EVENTS#AD_REQUEST_EMPTY
       */
      AD_REQUEST_EMPTY: 'adRequestEmpty',

      /**
       * This event is triggered upon when an error occurs trying to play an ad.
       * The handler is called with the following arguments:        
       * <ul>
       *   <li>The ad plugin.</li>
       *   <li>The time the ad was scheduled to play.</li>
       *   <li>The final ad tag after macro substitution</li>
       *   <li>The list of all video plugins.</li>
       *   <li>The error code.</li>
       *   <li>The error message.</li>
       *   <li>The media file URL.</li>
       * </ul>
       * @event OOV4.EVENTS#AD_PLAYBACK_ERROR
       */
      AD_PLAYBACK_ERROR: 'adPlaybackError',

      /**
       * This event is triggered when the ad plugin sdk records an impression event.
       * The handler is called with the following arguments:        
       * <ul>
       *   <li>The ad plugin.</li>
       *   <li>The time the ad was scheduled to play.</li>
       *   <li>The ad load time - time between ad request success and first frame started.</li>
       *   <li>The ad protocol: VAST or VPAID.</li>
       *   <li>The ad type: linearVideo, linearOverlay, nonLinearVideo, nonLinearOverlay.</li>
       * </ul>
       * @event OOV4.EVENTS#AD_SDK_IMPRESSION
       */
      AD_SDK_IMPRESSION: 'adSdkImpression',

      /**
       * This event is triggered when an ad has completed playback.
       * The handler is called with the following arguments:        
       * <ul>
       *   <li>The ad plugin.</li>
       *   <li>The time passed since the ad impression.</li>
       *   <li>If the ad was skipped or not.</li>
       * </ul>
       * @event OOV4.EVENTS#AD_COMPLETED
       */
      AD_COMPLETED: 'adCompleted',

      WILL_FETCH_ADS: 'willFetchAds',
      DISABLE_SEEKING: 'disableSeeking',
      ENABLE_SEEKING: 'enableSeeking',

      /**
       * This event is triggered before an ad is played. Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The duration of the ad.</li>
       *     <li>The ID of the ad.</li>
       *   </ul>
       *
       *
       * <h5>Analytics:</h5>
       * <p style="text-indent: 1em;"Triggers an <b>Ad Analytics</b> <code>AD_IMPRESSION</code> event.</p>
       *
       * @event OOV4.EVENTS#WILL_PLAY_ADS
       */
      WILL_PLAY_ADS: 'willPlayAds',
      WILL_PLAY_SINGLE_AD: 'willPlaySingleAd',
      WILL_PAUSE_ADS: 'willPauseAds',
      WILL_RESUME_ADS: 'willResumeAds',

      /**
       * This event is triggered to indicate that a non-linear ad will be played.  The handler is called with:
       *   <ul>
       *     <li>An object representing the ad.  For a definition, see class 'Ad' from the ad manager framework.</li>
       *   </ul>
       *
       * @event OOV4.EVENTS#WILL_PLAY_NONLINEAR_AD
       */
      WILL_PLAY_NONLINEAR_AD: 'willPlayNonlinearAd',

      /**
       * A non-linear ad will play now.  The handler is called with:
       *   <ul>
       *     <li>An object containing the following fields:</li>
       *     <ul>
       *       <li>ad: An object representing the ad.  For a definition, see class 'Ad' from the ad manager framework.</li>
       *       <li>url: [optional] The url of the nonlinear ad.</li>
       *     </ul>
       *   </ul>
       *
       * @event OOV4.EVENTS#PLAY_NONLINEAR_AD
       */
      PLAY_NONLINEAR_AD: 'playNonlinearAd',

      /**
      * A nonlinear ad was loaded in the UI.
      *
      *
      * @event OOV4.EVENTS#NONLINEAR_AD_DISPLAYED
      */
      NONLINEAR_AD_DISPLAYED: 'nonlinearAdDisplayed',

      /**
       * A set of ads have been played. Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The duration of the ad.</li>
       *     <li>The ID of the item to play.</li>
       *   </ul>
       *
       *
       * @event OOV4.EVENTS#ADS_PLAYED
       */
      ADS_PLAYED: 'adsPlayed',

      SINGLE_AD_PLAYED: 'singleAdPlayed',

      /**
       * This event is triggered when an error has occurred with an ad. <br/><br/>
       *
       *
       * @event OOV4.EVENTS#ADS_ERROR
       */
      ADS_ERROR: 'adsError',

      /**
       * This event is triggered when an ad has been clicked. <br/><br/>
       *
       *
       * @event OOV4.EVENTS#ADS_CLICKED
       */
      ADS_CLICKED: 'adsClicked',

      FIRST_AD_FETCHED: "firstAdFetched",
      AD_CONFIG_READY: "adConfigReady",

      /**
       * This event is triggered before the companion ads are shown.
       * Companion ads are displayed on a customer page and are not displayed in the player.
       * This event notifies the page handler to display the specified ad, and is the only means by which companion ads can appear.
       * If the page does not handle this event, companion ads will not appear.
       * Depending on the context, the handler is called with:
       *   <ul>
       *     <li>The ID of all companion ads.</li>
       *     <li>The ID of a single companion ad.</li>
       *   </ul>
       *
       *
       * <h5>Analytics:</h5>
       * <p style="text-indent: 1em;"Triggers an <b>Ad Analytics</b> <code>AD_IMPRESSION</code> event.</p>
       *
       * @event OOV4.EVENTS#WILL_SHOW_COMPANION_ADS
       */
      WILL_SHOW_COMPANION_ADS: "willShowCompanionAds",
      AD_FETCH_FAILED: "adFetchFailed",

      MIDROLL_PLAY_FAILED: "midrollPlayFailed",
      SKIP_AD: "skipAd",
      UPDATE_AD_COUNTDOWN: "updateAdCountdown",

      // this player is part of these experimental variations
      REPORT_EXPERIMENT_VARIATIONS: "reportExperimentVariations",

      FETCH_STYLE: "fetchStyle",
      STYLE_FETCHED: "styleFetched",
      SET_STYLE: "setStyle",

      USE_SERVER_SIDE_HLS_ADS: "useServerSideHlsAds",

      LOAD_ALL_VAST_ADS: "loadAllVastAds",
      ADS_FILTERED: "adsFiltered",
      ADS_MANAGER_HANDLING_ADS: "adsManagerHandlingAds",
      ADS_MANAGER_FINISHED_ADS: "adsManagerFinishedAds",

      // This event contains the information AMC need to know to place the overlay in the correct position.
      OVERLAY_RENDERING: "overlayRendering",

      /**
       * Event for signaling Ad Controls (Scrubber bar and Control bar) rendering:
       *   <ul>
       *     <li>Boolean parameter, 'false' to not show ad controls, 'true' to show ad controls based on skin config</li>
       *   </ul>
       *
       *
       * @event OOV4.EVENTS#SHOW_AD_CONTROLS
       */
      SHOW_AD_CONTROLS: "showAdControls",

      /**
       * Event for signaling Ad Marquee rendering:
       *   <ul>
       *     <li>Boolean parameter, 'false' to not show ad marquee, 'true' to show ad marquee based on skin config</li>
       *   </ul>
       *
       *
       * @event OOV4.EVENTS#SHOW_AD_MARQUEE
       */
      SHOW_AD_MARQUEE: "showAdMarquee",

      /**
       * An ad plugin will publish this event whenever the ad SDK throws an ad event. Typical ad events are
       * impressions, clicks, quartiles, etc. <br/><br/>
       *
       * @event OOV4.EVENTS#SDK_AD_EVENT
       * @private
       */
      SDK_AD_EVENT: "sdkAdEvent",

      // Window published beforeUnload event. It's still user cancellable.
      /**
       * The window, document, and associated resources are being unloaded.
       * The handler is called with <code>true</code> if a page unload has been requested, <code>false</code> otherwise.
       * This event may be required since some browsers perform asynchronous page loading while the current page is still active,
       * meaning that the end user loads a page with the Ooyala player, plays an asset, then redirects the page to a new URL they have specified.
       * Some browsers will start loading the new data while still displaying the player, which will result in an error since the networking has already been reset.
       * To prevent such false errors, listen to this event and ignore any errors raised after such actions have occurred.
       * <br/><br/>
       *
       *
       * @event OOV4.EVENTS#PAGE_UNLOAD_REQUESTED
       */
      PAGE_UNLOAD_REQUESTED: "pageUnloadRequested",
      // Either 1) The page is refreshing (almost certain) or 2) The user tried to refresh
      // the page, the embedding page had an "Are you sure?" prompt, the user clicked
      // on "stay", and a real error was produced due to another reason during the
      // following few seconds. The real error, if any, will be received in some seconds.
      // If we are certain it has unloaded, it's too late to be useful.
      PAGE_PROBABLY_UNLOADING: "pageProbablyUnloading",

      // DiscoveryApi publishes these, OoyalaAnalytics listens for them and propagates to reporter.js
      REPORT_DISCOVERY_IMPRESSION: "reportDiscoveryImpression",
      REPORT_DISCOVERY_CLICK: "reportDiscoveryClick",

      /**
       * Denotes that the playlist plugin is ready and has configured the playlist Pod(s).
       * @event OOV4.EVENTS#PLAYLISTS_READY
       * @public
       */
      PLAYLISTS_READY: 'playlistReady',

      /**
       * It shows that a type of a video was changed
       * @event OOV4.EVENTS#VIDEO_TYPE_CHANGED
       * @public
       */
      VIDEO_TYPE_CHANGED: "videoTypeChanged",

      /**
       * The UI layer has finished its initial render. The handler is called with an object
       * of the following structure:
       *
       * <ul>
       *   <li>videoWrapperClass: The class name of the element containing the UI layer</li>
       *   <li>pluginsClass: The class name of the element into which the plugins content should be inserted</li>
       * </ul>
       *
       * If the UI layer doesn't require any special handling, the values for these two keys will be null.
       *
       * @event OOV4.EVENTS#UI_READY
       */
      UI_READY: "uiReady",

      __end_marker : true
    };

    /**
	* @description Represents the Ooyala V3 Player Errors. Use message bus events to handle errors by subscribing to or intercepting the <code>OOV4.EVENTS.ERROR</code> event.
	* For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/errors_overview.html" target="target">Errors and Error Handling Overview</a>.
	* @summary Represents the Ooyala V3 Player Errors.
	* @namespace OOV4.ERROR
	*/
    OOV4.ERROR = {
     /**
      * @description Represents the <code>OOV4.ERROR.API</code> Ooyala V3 Player Errors. Use message bus events to handle errors by subscribing to or intercepting the <code>OOV4.EVENTS.ERROR</code> event.
	  * For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/errors_overview.html" target="target">Errors and Error Handling Overview</a>.
  	  * @summary Represents the <code>OOV4.ERROR.API</code> Ooyala V3 Player Errors.
      * @namespace OOV4.ERROR.API
      */
      API: {
       /**
        * @description <code>OOV4.ERROR.API.NETWORK ('network')</code>: Cannot contact the server.
    	* @constant OOV4.ERROR.API.NETWORK
    	* @type {string}
    	*/
        NETWORK:'network',
        /**
         * @description Represents the <code>OOV4.ERROR.API.SAS</code> Ooyala V3 Player Errors for the Stream Authorization Server.
         * Use message bus events to handle errors by subscribing to or intercepting the <code>OOV4.EVENTS.ERROR</code> event.
	     * For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/errors_overview.html" target="target">Errors and Error Handling Overview</a>.
	     * @summary Represents the <code>OOV4.ERROR.API.SAS</code> Ooyala V3 Player Errors.
         * @namespace OOV4.ERROR.API.SAS
         */
        SAS: {
         /**
          * @description <code>OOV4.ERROR.API.SAS.GENERIC ('sas')</code>: Invalid authorization response.
          * @constant OOV4.ERROR.API.SAS.GENERIC
          * @type {string}
          */
          GENERIC:'sas',
          /**
           * @description <code>OOV4.ERROR.API.SAS.GEO ('geo')</code>: This video is not authorized for your location.
           * @constant OOV4.ERROR.API.SAS.GEO
           * @type {string}
           */
          GEO:'geo',
          /**
           * @description <code>OOV4.ERROR.API.SAS.DOMAIN ('domain')</code>: This video is not authorized for your domain.
           * @constant OOV4.ERROR.API.SAS.DOMAIN
           * @type {string}
           */
          DOMAIN:'domain',
          /**
           * @description <code>OOV4.ERROR.API.SAS.FUTURE ('future')</code>: This video will be available soon.
           * @constant OOV4.ERROR.API.SAS.FUTURE
           * @type {string}
           */
          FUTURE:'future',
          /**
           * @description <code>OOV4.ERROR.API.SAS.PAST ('past')</code>: This video is no longer available.
           * @constant OOV4.ERROR.API.SAS.PAST
           * @type {string}
           */
          PAST:'past',
          /**
           * @description <code>OOV4.ERROR.API.SAS.DEVICE ('device')</code>: This video is not authorized for playback on this device.
           * @constant OOV4.ERROR.API.SAS.DEVICE
           * @type {string}
           */
          DEVICE:'device',
          /**
           * @description <code>OOV4.ERROR.API.SAS.PROXY ('proxy')</code>: An anonymous proxy was detected. Please disable the proxy and retry.
           * @constant OOV4.ERROR.API.SAS.PROXY
           * @type {string}
           */
          PROXY:'proxy',
          /**
           * @description <code>OOV4.ERROR.API.SAS.CONCURRENT_STREAM ('concurrent_streams')S</code>: You have exceeded the maximum number of concurrent streams.
           * @constant OOV4.ERROR.API.SAS.CONCURRENT_STREAMS
           * @type {string}
           */
          CONCURRENT_STREAMS:'concurrent_streams',
          /**
           * @description <code>OOV4.ERROR.API.SAS.INVALID_HEARTBEAT ('invalid_heartbeat')</code>: Invalid heartbeat response.
           * @constant OOV4.ERROR.API.SAS.INVALID_HEARTBEAT
           * @type {string}
           */
          INVALID_HEARTBEAT:'invalid_heartbeat',
          /**
           * @description <code>OOV4.ERROR.API.SAS.ERROR_DEVICE_INVALID_AUTH_TOKEN ('device_invalid_auth_token')</code>: Invalid Ooyala Player token.
           * @constant OOV4.ERROR.API.SAS.ERROR_DEVICE_INVALID_AUTH_TOKEN
           * @type {string}
           */
          ERROR_DEVICE_INVALID_AUTH_TOKEN:'device_invalid_auth_token',
          /**
           * @description <code>OOV4.ERROR.API.SAS.ERROR_DEVICE_LIMIT_REACHED ('device_limit_reached')</code>: The device limit has been reached.
           * The device limit is the maximum number of devices that can be registered with the viewer.
           * When the number of registered devices exceeds the device limit for the account or provider, this error is displayed.
           * @constant OOV4.ERROR.API.SAS.ERROR_DEVICE_LIMIT_REACHED
           * @type {string}
           */
          ERROR_DEVICE_LIMIT_REACHED:'device_limit_reached',
          /**
           * @description <code>OOV4.ERROR.API.SAS.ERROR_DEVICE_BINDING_FAILED ('device_binding_failed')</code>: Device binding failed.
           * If the number of devices registered is already equal to the number of devices that may be bound for the account,
           * attempting to register a new device will result in this error.
           * @constant OOV4.ERROR.API.SAS.ERROR_DEVICE_BINDING_FAILED
           * @type {string}
           */
          ERROR_DEVICE_BINDING_FAILED:'device_binding_failed',
          /**
           * @description <code>OOV4.ERROR.API.SAS.ERROR_DEVICE_ID_TOO_LONG ('device_id_too_long')</code>: The device ID is too long.
           * The length limit for the device ID is 1000 characters.
           * @constant OOV4.ERROR.API.SAS.ERROR_DEVICE_ID_TOO_LONG
           * @type {string}
           */
          ERROR_DEVICE_ID_TOO_LONG:'device_id_too_long',
          /**
           * @description <code>OOV4.ERROR.API.SAS.ERROR_DRM_RIGHTS_SERVER_ERROR ('drm_server_error')</code>: DRM server error.
           * @constant OOV4.ERROR.API.SAS.ERROR_DRM_RIGHTS_SERVER_ERROR
           * @type {string}
           */
          ERROR_DRM_RIGHTS_SERVER_ERROR:'drm_server_error',
          /**
           * @description <code>OOV4.ERROR.API.SAS.ERROR_DRM_GENERAL_FAILURE ('drm_general_failure')</code>: General error with acquiring license.
           * @constant OOV4.ERROR.API.SAS.ERROR_DRM_GENERAL_FAILURE
           * @type {string}
           */
          ERROR_DRM_GENERAL_FAILURE:'drm_general_failure',

          /**
           * @description <code>OOV4.ERROR.API.SAS.ERROR_INVALID_ENTITLEMENTS ('invalid_entitlements')</code>: User Entitlement Terminated - Stream No Longer Active for the User.
           * @constant OOV4.ERROR.API.SAS.ERROR_INVALID_ENTITLEMENTS
           * @type {string}
           */
          ERROR_INVALID_ENTITLEMENTS:'invalid_entitlements'
        },
       /**
        * @description <code>OOV4.ERROR.API.CONTENT_TREE ('content_tree')</code>: Invalid Content.
     	* @constant OOV4.ERROR.API.CONTENT_TREE
     	* @type {string}
     	*/
        CONTENT_TREE:'content_tree',
       /**
        * @description <code>OOV4.ERROR.API.METADATA ('metadata')</code>: Invalid Metadata.
      	* @constant OOV4.ERROR.API.METADATA
      	* @type {string}
      	*/
        METADATA:'metadata'
      },
     /**
      * @description Represents the <code>OOV4.ERROR.PLAYBACK</code> Ooyala V3 Player Errors. Use message bus events to handle errors by subscribing to or intercepting the <code>OOV4.EVENTS.ERROR</code> event.
 	  * For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/errors_overview.html" target="target">Errors and Error Handling Overview</a>.
   	  * @summary Represents the <code>OOV4.ERROR.PLAYBACK</code> Ooyala V3 Player Errors.
      * @namespace OOV4.ERROR.PLAYBACK
      */
      PLAYBACK: {
       /**
        * @description <code>OOV4.ERROR.PLAYBACK.GENERIC ('playback')</code>: Could not play the content.
        * @constant OOV4.ERROR.PLAYBACK.GENERIC
        * @type {string}
        */
        GENERIC:'playback',
        /**
         * @description <code>OOV4.ERROR.PLAYBACK.STREAM ('stream')</code>: This video is not encoded for your device.
         * @constant OOV4.ERROR.PLAYBACK.STREAM
         * @type {string}
         */
        STREAM:'stream',
        /**
         * @description <code>OOV4.ERROR.PLAYBACK.LIVESTREAM ('livestream')</code>: Live stream is off air.
         * @constant OOV4.ERROR.PLAYBACK.LIVESTREAM
         * @type {string}
         */
        LIVESTREAM:'livestream',
        /**
         * @description <code>OOV4.ERROR.PLAYBACK.NETWORK ('network_error')</code>: The network connection was temporarily lost.
         * @constant OOV4.ERROR.PLAYBACK.NETWORK
         * @type {string}
         */
        NETWORK: 'network_error'
      },
      CHROMECAST: {
        MANIFEST:'chromecast_manifest',
        MEDIAKEYS:'chromecast_mediakeys',
        NETWORK:'chromecast_network',
        PLAYBACK:'chromecast_playback'
      },
     /**
      * @description <code>OOV4.ERROR.UNPLAYABLE_CONTENT ('unplayable_content')</code>: This video is not playable on this player.
   	  * @constant OOV4.ERROR.UNPLAYABLE_CONTENT
   	  * @type {string}
   	  */
      UNPLAYABLE_CONTENT:'unplayable_content',
     /**
      * @description <code>OOV4.ERROR.INVALID_EXTERNAL_ID ('invalid_external_id')</code>: Invalid External ID.
      * @constant OOV4.ERROR.INVALID_EXTERNAL_ID
      * @type {string}
      */
      INVALID_EXTERNAL_ID:'invalid_external_id',
      /**
       * @description <code>OOV4.ERROR.EMPTY_CHANNEL ('empty_channel')</code>: This channel is empty.
       * @constant OOV4.ERROR.EMPTY_CHANNEL
       * @type {string}
       */
      EMPTY_CHANNEL:'empty_channel',
      /**
       * @description <code>OOV4.ERROR.EMPTY_CHANNEL_SET ('empty_channel_set')</code>: This channel set is empty.
       * @constant OOV4.ERROR.EMPTY_CHANNEL_SET
       * @type {string}
       */
      EMPTY_CHANNEL_SET:'empty_channel_set',
      /**
       * @description <code>OOV4.ERROR.CHANNEL_CONTENT ('channel_content')</code>: This channel is not playable at this time.
       * @constant OOV4.ERROR.CHANNEL_CONTENT
       * @type {string}
       */
      CHANNEL_CONTENT:'channel_content',
      /**
       * @description Represents the <code>OOV4.ERROR.VC</code> Ooyala V4 Player Errors for the Video Technology stack.
       * Use message bus events to handle errors by subscribing to or intercepting the <code>OOV4.EVENTS.ERROR</code> event.
           * For more information, see <a href="http://support.ooyala.com/developers/documentation/concepts/errors_overview.html" target="target">Errors and Error Handling Overview</a>.
           * @summary Represents the <code>OOV4.ERROR.VC</code> Ooyala V4 Player Errors.
       * @namespace OOV4.ERROR.VC
       */
      VC: {
        /**
        * @description <code>OOV4.ERROR.VC.UNSUPPORTED_ENCODING ('unsupported_encoding')</code>:
        *    This device does not have an available decoder for this stream type.
        * @constant OOV4.ERROR.VC.UNSUPPORTED_ENCODING
        * @type {string}
        */
        UNSUPPORTED_ENCODING:'unsupported_encoding',

        /**
        * @description <code>OOV4.ERROR.VC.UNABLE_TO_CREATE_VIDEO_ELEMENT ('unable_to_create_video_element')</code>:
        *    A video element to play the given stream could not be created
        * @constant OOV4.ERROR.VC.UNABLE_TO_CREATE_VIDEO_ELEMENT
        * @type {string}
        */
        UNABLE_TO_CREATE_VIDEO_ELEMENT:'unable_to_create_video_element',
      }
    };

    // All Server-side URLS
    OOV4.URLS = {
      VAST_PROXY: _.template('http://player.ooyala.com/nuplayer/mobile_vast_ads_proxy?callback=<%=cb%>&embed_code=<%=embedCode%>&expires=<%=expires%>&tag_url=<%=tagUrl%>'),
      EXTERNAL_ID: _.template('<%=server%>/player_api/v1/content_tree/external_id/<%=pcode%>/<%=externalId%>'),
      CONTENT_TREE: _.template('<%=server%>/player_api/v1/content_tree/embed_code/<%=pcode%>/<%=embedCode%>'),
      METADATA: _.template('<%=server%>/player_api/v1/metadata/embed_code/<%=playerBrandingId%>/<%=embedCode%>?videoPcode=<%=pcode%>'),
      SAS: _.template('<%=server%>/player_api/v1/authorization/embed_code/<%=pcode%>/<%=embedCode%>'),
      ANALYTICS: _.template('<%=server%>/reporter.js'),
      THUMBNAILS: _.template('<%=server%>/api/v1/thumbnail_images/<%=embedCode%>'),
      __end_marker : true
    };

    OOV4.PLUGINS = {
      ADS: "ads",
      VIDEO: "video",
      ANALYTICS: "analytics",
      PLAYLIST: "playlist",
      SKIN: "skin"
    };

    OOV4.VIDEO = {
      MAIN: "main",
      ADS: "ads",

      /**
       * @description Represents the <code>OOV4.VIDEO.ENCODING</code> encoding types. Used to denote video
       *              encoding types associated with a video stream url.
       * @summary Represents the <code>OOV4.VIDEO.ENCODING</code> encoding types.
       * @namespace OOV4.VIDEO.ENCODING
       */
      ENCODING: {
        /**
         * @description Represents DRM support for the encoding types.
         * @summary Represents the <code>OOV4.VIDEO.ENCODING.DRM</code> encoding types.
         * @namespace OOV4.VIDEO.ENCODING.DRM
         */
        DRM : {
          /**
           * @description <code>OOV4.VIDEO.ENCODING.DRM.HLS ('hls_drm')</code>:
           *   An encoding type for drm HLS streams.
           * @constant OOV4.VIDEO.ENCODING.DRM.HLS
           * @type {string}
           */
          HLS: "hls_drm",

          /**
           * @description <code>OOV4.VIDEO.ENCODING.DRM.DASH ('dash_drm')</code>:
           *   An encoding type for drm dash streams.
           * @constant OOV4.VIDEO.ENCODING.DRM.DASH
           * @type {string}
           */
          DASH: "dash_drm",
        },
        /**
         * @description <code>OOV4.VIDEO.ENCODING.AUDIO ('audio')</code>:
         *   An encoding type for non-drm audio streams.
         * @constant OOV4.VIDEO.ENCODING.AUDIO
         * @type {string}
         */
        AUDIO: "audio",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.DASH ('dash')</code>:
         *   An encoding type for non-drm dash streams (mpd extension).
         * @constant OOV4.VIDEO.ENCODING.DASH
         * @type {string}
         */
        DASH: "dash",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.HDS ('hds')</code>:
         *   An encoding type for non-drm hds streams (hds extension).
         * @constant OOV4.VIDEO.ENCODING.HDS
         * @type {string}
         */
        HDS: "hds",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.HLS ('hls')</code>:
         *   An encoding type for non-drm HLS streams (m3u8 extension).
         * @constant OOV4.VIDEO.ENCODING.HLS
         * @type {string}
         */
        HLS: "hls",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.IMA ('ima')</code>:
         *   A string that represents a video stream that is controlled and configured directly by IMA.
         * @constant OOV4.VIDEO.ENCODING.IMA
         * @type {string}
         */
        IMA: "ima",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.PULSE ('pulse')</code>:
         *   A string that represents a video stream that is controlled and configured directly by Pulse.
         * @constant OOV4.VIDEO.ENCODING.PULSE
         * @type {string}
         */
        PULSE: "pulse",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.MP4 ('mp4')</code>:
         *   An encoding type for non-drm mp4 streams (mp4 extension).
         * @constant OOV4.VIDEO.ENCODING.MP4
         * @type {string}
         */
        MP4: "mp4",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.YOUTUBE ('youtube')</code>:
         *   An encoding type for non-drm youtube streams.
         * @constant OOV4.VIDEO.ENCODING.YOUTUBE
         * @type {string}
         */
        YOUTUBE:"youtube",
        
        /**
         * @description <code>OOV4.VIDEO.ENCODING.RTMP ('rtmp')</code>:
         *   An encoding type for non-drm rtmp streams.
         * @constant OOV4.VIDEO.ENCODING.RTMP
         * @type {string}
         */
        RTMP: "rtmp",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.SMOOTH ('smooth')</code>:
         *   An encoding type for non-drm smooth streams.
         * @constant OOV4.VIDEO.ENCODING.SMOOTH
         * @type {string}
         */
        SMOOTH: "smooth",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.WEBM ('webm')</code>:
         *   An encoding type for non-drm webm streams (webm extension).
         * @constant OOV4.VIDEO.ENCODING.WEBM
         * @type {string}
         */
        WEBM: "webm",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.AKAMAI_HD_VOD ('akamai_hd_vod')</code>:
         *   An encoding type for akamai hd vod streams.
         * @constant OOV4.VIDEO.ENCODING.AKAMAI_HD_VOD
         * @type {string}
         */
        AKAMAI_HD_VOD: "akamai_hd_vod",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.AKAMAI_HD2_VOD_HLS ('akamai_hd2_vod_hls')</code>:
         *   An encoding type for akamai hd2 vod hls streams.
         * @constant OOV4.VIDEO.ENCODING.AKAMAI_HD2_VOD_HLS
         * @type {string}
         */
        AKAMAI_HD2_VOD_HLS: "akamai_hd2_vod_hls",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.AKAMAI_HD2_VOD_HDS ('akamai_hd2_vod_hds')</code>:
         *   An encoding type for akamai hd2 vod hds streams.
         * @constant OOV4.VIDEO.ENCODING.AKAMAI_HD2_VOD_HDS
         * @type {string}
         */
        AKAMAI_HD2_VOD_HDS: "akamai_hd2_vod_hds",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.AKAMAI_HD2_HDS ('akamai_hd2_hds')</code>:
         *   An encoding type for akamai hd2 live/remote hds streams.
         * @constant OOV4.VIDEO.ENCODING.AKAMAI_HD2_HDS
         * @type {string}
         */
        AKAMAI_HD2_HDS: "akamai_hd2_hds",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.AKAMAI_HD2_HLS ('akamai_hd2_hls')</code>:
         *   An encoding type for akamai hd2 live hls streams.
         * @constant OOV4.VIDEO.ENCODING.AKAMAI_HD2_HLS
         * @type {string}
         */
        AKAMAI_HD2_HLS: "akamai_hd2_hls",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.FAXS_HLS ('faxs_hls')</code>:
         *   An encoding type for adobe faxs streams.
         * @constant OOV4.VIDEO.ENCODING.FAXS_HLS
         * @type {string}
         */
        FAXS_HLS: "faxs_hls",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.WIDEVINE_HLS ('wv_hls')</code>:
         *   An encoding type for widevine hls streams.
         * @constant OOV4.VIDEO.ENCODING.WIDEVINE_HLS
         * @type {string}
         */
        WIDEVINE_HLS: "wv_hls",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.WIDEVINE_MP4 ('wv_mp4')</code>:
         *   An encoding type for widevine mp4 streams.
         * @constant OOV4.VIDEO.ENCODING.WIDEVINE_MP4
         * @type {string}
         */
        WIDEVINE_MP4: "wv_mp4",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.WIDEVINE_WVM ('wv_wvm')</code>:
         *   An encoding type for widevine wvm streams.
         * @constant OOV4.VIDEO.ENCODING.WIDEVINE_WVM
         * @type {string}
         */
        WIDEVINE_WVM: "wv_wvm",

        /**
         * @description <code>OOV4.VIDEO.ENCODING.UNKNOWN ('unknown')</code>:
         *   An encoding type for unknown streams.
         * @constant OOV4.VIDEO.ENCODING.UNKNOWN
         * @type {string}
         */
        UNKNOWN: "unknown"
      },

      /**
       * @description Represents the <code>OOV4.VIDEO.FEATURE</code> feature list. Used to denote which
       * features are supported by a video player.
       * @summary Represents the <code>OOV4.VIDEO.FEATURE</code> feature list.
       * @namespace OOV4.VIDEO.FEATURE
       */
      FEATURE: {
        /**
         * @description <code>OOV4.VIDEO.FEATURE.CLOSED_CAPTIONS ('closedCaptions')</code>:
         *   Closed captions parsed by the video element and sent to the player.
         * @constant OOV4.VIDEO.FEATURE.CLOSED_CAPTIONS
         * @type {string}
         */
        CLOSED_CAPTIONS: "closedCaptions",

        /**
         * @description <code>OOV4.VIDEO.FEATURE.VIDEO_OBJECT_SHARING_GIVE ('videoObjectSharingGive')</code>:
         *   The video object is accessible and can be found by the player via the DOM element id.  Other
         *   modules can use this video object if required.
         * @constant OOV4.VIDEO.FEATURE.VIDEO_OBJECT_SHARING_GIVE
         * @type {string}
         */
        VIDEO_OBJECT_SHARING_GIVE: "videoObjectSharingGive",

        /**
         * @description <code>OOV4.VIDEO.FEATURE.VIDEO_OBJECT_SHARING_TAKE ('videoObjectSharingTake')</code>:
         *   The video object used can be created external from this video plugin.  This plugin will use the
         *   existing video element as its own.
         * @constant OOV4.VIDEO.FEATURE.VIDEO_OBJECT_SHARING_TAKE
         * @type {string}
         */
        VIDEO_OBJECT_SHARING_TAKE: "videoObjectSharingTake",

        /**
         * @description <code>OOV4.VIDEO.FEATURE.BITRATE_CONTROL ('bitrateControl')</code>:
         *   The video object allows the playing bitrate to be selected via the SET_TARGET_BITRATE event.
         *   The video controller must publish BITRATE_INFO_AVAILABLE with a list of bitrate objects that can be selected.
         *   The video controller must publish BITRATE_CHANGED events with the bitrate object that was switched to.
         *   A bitrate object should at minimum contain height, width, and bitrate properties. Height and width
         *   should be the vertical and horizontal resoluton of the stream and bitrate should be in bits per second.
         * @constant OOV4.VIDEO.FEATURE.BITRATE_CONTROL
         * @type {string}
         */
        BITRATE_CONTROL: "bitrateControl"
      },

      /**
       * @description Represents the <code>OOV4.VIDEO.TECHNOLOGY</code> core video technology.
       * @summary Represents the <code>OOV4.VIDEO.TECHNOLOGY</code> core technology of the video element.
       * @namespace OOV4.VIDEO.TECHNOLOGY
       */
      TECHNOLOGY: {
        /**
         * @description <code>OOV4.VIDEO.TECHNOLOGY.FLASH ('flash')</code>:
         *   The core video technology is based on Adobe Flash.
         * @constant OOV4.VIDEO.TECHNOLOGY.FLASH
         * @type {string}
         */
        FLASH: "flash",

        /**
         * @description <code>OOV4.VIDEO.TECHNOLOGY.HTML5 ('html5')</code>:
         *   The core video technology is based on the native html5 'video' tag.
         * @constant OOV4.VIDEO.TECHNOLOGY.HTML5
         * @type {string}
         */
        HTML5: "html5",

        /**
         * @description <code>OOV4.VIDEO.TECHNOLOGY.MIXED ('mixed')</code>:
         *   The core video technology used may be based on any one of multiple core technologies.
         * @constant OOV4.VIDEO.TECHNOLOGY.MIXED
         * @type {string}
         */
        MIXED: "mixed",

        /**
         * @description <code>OOV4.VIDEO.TECHNOLOGY.OTHER ('other')</code>:
         *   The video is based on a core video technology that doesn't fit into another classification
         *   found in <code>OOV4.VIDEO.TECHNOLOGY</code>.
         * @constant OOV4.VIDEO.TECHNOLOGY.OTHER
         * @type {string}
         */
        OTHER: "other"
      }

    };

    OOV4.CSS = {
      VISIBLE_POSITION : "0px",
      INVISIBLE_POSITION : "-100000px",
      VISIBLE_DISPLAY : "block",
      INVISIBLE_DISPLAY : "none",
      VIDEO_Z_INDEX: 10000,
      SUPER_Z_INDEX: 20000,
      ALICE_SKIN_Z_INDEX: 11000,
      OVERLAY_Z_INDEX: 10500,
      TRANSPARENT_COLOR : "rgba(255, 255, 255, 0)",

      __end_marker : true
    };

    OOV4.TEMPLATES = {
      RANDOM_PLACE_HOLDER: ['[place_random_number_here]', '<now>', '[timestamp]', '<rand-num>', '[cache_buster]', '[random]'],
      REFERAK_PLACE_HOLDER: ['[referrer_url]', '[LR_URL]', '[description_url]'],
      EMBED_CODE_PLACE_HOLDER: ['[oo_embedcode]'],
      MESSAGE : '\
                  <table width="100%" height="100%" bgcolor="black" style="padding-left:55px; padding-right:55px; \
                  background-color:black; color: white;">\
                  <tbody>\
                  <tr valign="middle">\
                  <td align="right"><span style="font-family:Arial; font-size:20px">\
                  <%= message %>\
                  </span></td></tr></tbody></table>\
                  ',
      __end_marker : true
    };

    OOV4.CONSTANTS = {
      // Ad frequency constants
      AD_PLAY_COUNT_KEY: "oo_ad_play_count",
      AD_ID_TO_PLAY_COUNT_DIVIDER: ":",
      AD_PLAY_COUNT_DIVIDER: "|",
      MAX_AD_PLAY_COUNT_HISTORY_LENGTH: 20,

      CONTROLS_BOTTOM_PADDING: 10,

      SEEK_TO_END_LIMIT: 4,

      /**
       * @description <code>OOV4.CONSTANTS.CLOSED_CAPTIONS</code>:
       *   An object containing the possible modes for the closed caption text tracks.
       * @constant OOV4.CONSTANTS.CLOSED_CAPTIONS
       * @type {object}
       */
      CLOSED_CAPTIONS: {
        /**
         * @description <code>OOV4.CONSTANTS.CLOSED_CAPTIONS.SHOWING ('showing')</code>:
         *   Closed caption text track mode for showing closed captions.
         * @constant OOV4.CONSTANTS.CLOSED_CAPTIONS.SHOWING
         * @type {string}
         */
        SHOWING: "showing",
        /**
         * @description <code>OOV4.CONSTANTS.CLOSED_CAPTIONS.HIDDEN ('hidden')</code>:
         *   Closed caption text track mode for hiding closed captions.
         * @constant OOV4.CONSTANTS.CLOSED_CAPTIONS.HIDDEN
         * @type {string}
         */
        HIDDEN: "hidden",
        /**
         * @description <code>OOV4.CONSTANTS.CLOSED_CAPTIONS.DISABLED ('disabled')</code>:
         *   Closed caption text track mode for disabling closed captions.
         * @constant OOV4.CONSTANTS.CLOSED_CAPTIONS.DISABLED
         * @type {string}
         */
        DISABLED: "disabled"
      },

      OOYALA_PLAYER_SETTINGS_KEY: 'ooyala_player_settings',

      __end_marker : true
    };

  }(OOV4,OOV4._));

},{}],5:[function(require,module,exports){
  (function(OOV4,_,HM) {
    // Ensure playerParams exists
    OOV4.playerParams = HM.safeObject('environment.playerParams', OOV4.playerParams,{});

    // Init publisher's OOV4.playerParams via player parameter object
    OOV4.configurePublisher = function(parameters) {
      OOV4.playerParams.pcode = parameters.pcode || OOV4.playerParams.pcode || '';
      OOV4.playerParams.playerBrandingId = parameters.playerBrandingId || OOV4.playerParams.playerBrandingId || '';
      OOV4.playerParams.debug = parameters.debug || OOV4.playerParams.debug || '';
    };

    OOV4.isPublisherConfigured = function() {
      return !!(OOV4.playerParams.pcode && OOV4.playerParams.playerBrandingId);
    };

    // Set API end point environment
    OOV4.setServerHost = function(parameters) {
      OOV4.playerParams.api_ssl_server = parameters.api_ssl_server || OOV4.playerParams.api_ssl_server || null;
      OOV4.playerParams.api_server = parameters.api_server || OOV4.playerParams.api_server || null;
      OOV4.playerParams.auth_ssl_server = parameters.auth_ssl_server || OOV4.playerParams.auth_ssl_server || null;
      OOV4.playerParams.auth_server = parameters.auth_server || OOV4.playerParams.auth_server || null;
      OOV4.playerParams.analytics_ssl_server = parameters.analytics_ssl_server || OOV4.playerParams.analytics_ssl_server || null;
      OOV4.playerParams.analytics_server = parameters.analytics_server || OOV4.playerParams.analytics_server || null;

      updateServerHost();
    };

    var updateServerHost = function () {
      OOV4.SERVER =
      {
        API: OOV4.isSSL ? OOV4.playerParams.api_ssl_server || "https://player.ooyala.com" :
                        OOV4.playerParams.api_server || "http://player.ooyala.com",
        AUTH: OOV4.isSSL ? OOV4.playerParams.auth_ssl_server || "https://player.ooyala.com/sas" :
                        OOV4.playerParams.auth_server || "http://player.ooyala.com/sas",
        ANALYTICS: OOV4.isSSL ? OOV4.playerParams.analytics_ssl_server || "https://player.ooyala.com" :
                              OOV4.playerParams.analytics_server || "http://player.ooyala.com"
      };
    }

    // process tweaks
    // tweaks is optional. Hazmat takes care of this but throws an undesirable warning.
    OOV4.playerParams.tweaks = OOV4.playerParams.tweaks || '';
    OOV4.playerParams.tweaks = HM.safeString('environment.playerParams.tweaks', OOV4.playerParams.tweaks,'');
    OOV4.playerParams.tweaks = OOV4.playerParams.tweaks.split(',');

    // explicit list of supported tweaks
    OOV4.tweaks = {};
    OOV4.tweaks["android-enable-hls"] = _.contains(OOV4.playerParams.tweaks, 'android-enable-hls');
    OOV4.tweaks["html5-force-mp4"] = _.contains(OOV4.playerParams.tweaks, 'html5-force-mp4');

    // Max timeout for fetching ads metadata, default to 3 seconds.
    OOV4.playerParams.maxAdsTimeout = OOV4.playerParams.maxAdsTimeout || 5;
    // max wrapper ads depth we look, we will only look up to 3 level until we get vast inline ads
    OOV4.playerParams.maxVastWrapperDepth = OOV4.playerParams.maxVastWrapperDepth || 3;
    OOV4.playerParams.minLiveSeekWindow = OOV4.playerParams.minLiveSeekWindow || 10;

    // Ripped from: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    OOV4.guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
    OOV4.playerCount = 0;

    // Check environment to see if this is prod
    OOV4.isProd = !!(OOV4.playerParams.environment &&
                   OOV4.playerParams.environment.match(/^prod/i));

    // Environment invariant.
    OOV4.platform = window.navigator.platform;
    OOV4.os = window.navigator.appVersion;
    OOV4.supportsVideo = !!document.createElement('video').canPlayType;

    OOV4.browserSupportsCors = (function() {
      try {
        return _.has(new XMLHttpRequest(), "withCredentials") ||
          _.has(XMLHttpRequest.prototype, "withCredentials");
      } catch(e) {
        return false;
      }
    }());

    OOV4.isWindows = (function() {
      return !!OOV4.platform.match(/Win/);
    }());

    OOV4.isIos = (function() {
      return !!OOV4.platform.match(/iPhone|iPad|iPod/);
    }());

    OOV4.isIphone = (function() {
      return !!OOV4.platform.match(/iPhone|iPod/);
    }());

    OOV4.isIpad = (function() {
      return !!OOV4.platform.match(/iPad/);
    }());

    OOV4.iosMajorVersion = (function() {
      try {
        if (OOV4.isIos) {
          return parseInt(window.navigator.userAgent.match(/OS (\d+)/)[1], 10);
        } else {
          return null;
        }
      } catch(err) {
        return null;
      }
    }());

    OOV4.isAndroid = (function() {
      return !!(OOV4.os.match(/Android/) && !OOV4.os.match(/Windows Phone/));
    }());

    OOV4.isAndroid4Plus = (function() {
      var version = OOV4.os.match(/Android [\d\.]*;/);
      if (version && version.length > 0) {
        version = parseInt(version[0].substring(version[0].indexOf(' ') + 1,
                           version[0].search('[\.\;]')));
      }
      return OOV4.isAndroid && version >= 4;
    }());

    OOV4.isRimDevice = (function() {
      return !!(OOV4.os.match(/BlackBerry/) || OOV4.os.match(/PlayBook/));
    }());

    OOV4.isFirefox = (function() {
      return !!window.navigator.userAgent.match(/Firefox/);
    }());

    OOV4.isChrome = (function () {
      return (!!window.navigator.userAgent.match(/Chrome/) && !window.navigator.userAgent.match(/Edge/));
    }());

    OOV4.isSafari = (function () {
      return (!!window.navigator.userAgent.match(/AppleWebKit/) &&
              !window.navigator.userAgent.match(/Chrome/) &&
              !window.navigator.userAgent.match(/like iPhone/));
    }());

    OOV4.chromeMajorVersion = (function () {
      try {
        return parseInt(window.navigator.userAgent.match(/Chrome.([0-9]*)/)[1], 10);
      } catch(err) {
        return null;
      }
    }());

    OOV4.isIE = (function(){
      return !!window.navigator.userAgent.match(/MSIE/) || !!window.navigator.userAgent.match(/Trident/);
    }());

    OOV4.isEdge = (function(){
      return !!window.navigator.userAgent.match(/Edge/);
    }());

    OOV4.isIE11Plus = (function(){
      // check if IE
      if (!window.navigator.userAgent.match(/Trident/)) {
        return false;
      }

      // extract version number
      var ieVersionMatch = window.navigator.userAgent.match(/rv:(\d*)/);
      var ieVersion = ieVersionMatch && ieVersionMatch[1];
      return ieVersion >= 11;
    }());

    OOV4.isWinPhone = (function(){
      return !!OOV4.os.match(/Windows Phone/) || !!OOV4.os.match(/ZuneWP/) || !!OOV4.os.match(/XBLWP/);
    }());

    OOV4.isSmartTV = (function(){
      return (!!window.navigator.userAgent.match(/SmartTV/) ||
             !!window.navigator.userAgent.match(/NetCast/));
    }());

    OOV4.isMacOs = (function() {
      return !OOV4.isIos && !!OOV4.os.match(/Mac/) && !window.navigator.userAgent.match(/like iPhone/);
    }());

    OOV4.isMacOsLionOrLater = (function() {
      // TODO: revisit for Firefox when possible/necessary
      var macOs = OOV4.os.match(/Mac OS X ([0-9]+)_([0-9]+)/);
      if (macOs == null || macOs.length < 3) { return false; }
      return (parseInt(macOs[1],10) >= 10 && parseInt(macOs[2],10) >= 7);
    }());

    OOV4.macOsSafariVersion = (function() {
      try {
        if (OOV4.isMacOs && OOV4.isSafari) {
          return parseInt(window.navigator.userAgent.match(/Version\/(\d+)/)[1], 10);
        } else {
          return null;
        }
      } catch(err) {
        return null;
      }
    }());

    OOV4.isKindleHD = (function(){
      return !!OOV4.os.match(/Silk\/2/);
    }());

    OOV4.supportMSE = (function() {
      return 'MediaSource' in window || 'WebKitMediaSource' in window || 'mozMediaSource' in window || 'msMediaSource' in window;
    }());

    OOV4.supportAds = (function() {
      // We are disabling ads for Android 2/3 device, the reason is that main video is not resuming after
      // ads finish. Util we can figure out a work around, we will keep ads disabled.
      return !OOV4.isWinPhone && !OOV4.os.match(/Android [23]/);
    }());

    OOV4.allowGesture = (function() {
      return OOV4.isIos;
    }());

    OOV4.allowAutoPlay = (function() {
      return !OOV4.isIos && !OOV4.isAndroid;
    }());

    OOV4.supportTouch = (function() {
      // IE8- doesn't support JS functions on DOM elements
      if (document.documentElement.hasOwnProperty && document.documentElement.hasOwnProperty("ontouchstart")) { return true; }
      return false;
    }());

    OOV4.docDomain = (function() {
      var domain = null;
      try {
        domain = document.domain;
      } catch(e) {}
      if (!OOV4._.isEmpty(domain)) { return domain; }
      if (OOV4.isSmartTV) { return 'SmartTV'; }
      return 'unknown';
    }());

    OOV4.uiParadigm = (function() {
      var paradigm = 'tablet';

      // The below code attempts to decide whether or not we are running in 'mobile' mode
      // Meaning that no controls are displayed, chrome is minimized and only fullscreen playback is allowed
      // Unfortunately there is no clean way to figure out whether the device is tablet or phone
      // or even to properly detect device screen size http://tripleodeon.com/2011/12/first-understand-your-screen/
      // So there is a bunch of heuristics for doing just that
      // Anything that is not explicitly detected as mobile defaults to desktop
      // so worst case they get ugly chrome instead of unworking player
      if(OOV4.isAndroid4Plus && OOV4.tweaks["android-enable-hls"]) {
        // special case for Android 4+ running HLS
        paradigm = 'tablet';
      } else if(OOV4.isIphone) {
        paradigm = 'mobile-native';
      } else if(OOV4.os.match(/BlackBerry/)) {
        paradigm = 'mobile-native';
      } else if(OOV4.os.match(/iPad/)) {
        paradigm = 'tablet';
      } else if(OOV4.isKindleHD) {
        // Kindle Fire HD
        paradigm = 'mobile-native';
      } else if(OOV4.os.match(/Silk/)) {
        // Kindle Fire
        paradigm = 'mobile';
      } else if(OOV4.os.match(/Android 2/)) {
        // On Android 2+ only window.outerWidth is reliable, so we are using that and window.orientation
        if((window.orientation % 180) == 0 &&  (window.outerWidth / window.devicePixelRatio) <= 480 ) {
          // portrait mode
          paradigm = 'mobile';
        } else if((window.outerWidth / window.devicePixelRatio) <= 560 ) {
          // landscape mode
          paradigm = 'mobile';
        }
      } else if(OOV4.os.match(/Android/)) {
          paradigm = 'tablet';
      } else if (OOV4.isWinPhone) {
        // Windows Phone is mobile only for now, tablets not yet released
        paradigm = 'mobile';
      } else if(!!OOV4.platform.match(/Mac/)    // Macs
                || !!OOV4.platform.match(/Win/)  // Winboxes
                || !!OOV4.platform.match(/Linux/)) {    // Linux
        paradigm = 'desktop';
      }

      return paradigm;
    }());

    /**
     * Determines if a single video element should be used.<br/>
     * <ul><li>Use single video element on iOS, all versions</li>
     *     <li>Use single video element on Android, all versions</li></ul>
     * 01/11/17 Previous JSDoc for Android - to be removed once fix is confirmed and there is no regression:<br />
     * <ul><li>Use single video element on Android < v4.0</li>
     *     <li>Use single video element on Android with Chrome < v40<br/>
     *       (note, it might work on earlier versions but don't know which ones! Does not work on v18)</li></ul>
     *
     * @private
     * @returns {boolean} True if a single video element is required
     */
    OOV4.requiresSingleVideoElement = (function() {
      return OOV4.isIos || OOV4.isAndroid;
      // 01/11/17 - commenting out, but not removing three lines below pending QA, we may need to restore this logic
      //var iosRequireSingleElement = OOV4.isIos;
      //var androidRequireSingleElement = OOV4.isAndroid && (!OOV4.isAndroid4Plus || OOV4.chromeMajorVersion < 40);
      // return iosRequireSingleElement || androidRequireSingleElement;
    }());

    // TODO(jj): need to make this more comprehensive
    // Note(jj): only applies to mp4 videos for now
    OOV4.supportedVideoProfiles = (function() {
      // iOS only supports baseline profile
      if (OOV4.isIos || OOV4.isAndroid) {
        return "baseline";
      }
      return null;
    }());

    // TODO(bz): add flash for device when we decide to use stream data from sas
    // TODO(jj): add AppleTV and other devices as necessary
    OOV4.device = (function() {
        var device = 'html5';
        if (OOV4.isIphone) { device = 'iphone-html5'; }
        else if (OOV4.isIpad) { device = 'ipad-html5'; }
        else if (OOV4.isAndroid) { device = 'android-html5'; }
        else if (OOV4.isRimDevice) { device = 'rim-html5'; }
        else if (OOV4.isWinPhone) { device = 'winphone-html5'; }
        else if (OOV4.isSmartTV) { device = 'smarttv-html5'; }
        return device;
    }());

    // list of environment-specific modules needed by the environment or empty to include all
    // Note: should never be empty because of html5
    OOV4.environmentRequiredFeatures = (function(){
      var features = [];

      if (OOV4.os.match(/Android 2/)) {  // safari android
        features.push('html5-playback');
      } else { // normal html5
        features.push('html5-playback');
        if (OOV4.supportAds) { features.push('ads'); }
      }

      return _.reduce(features, function(memo, feature) {return memo+feature+' ';}, '');
    }());

    OOV4.supportMidRollAds = (function() {
      return (OOV4.uiParadigm === "desktop" && !OOV4.isIos && !OOV4.isRimDevice);
    }());

    OOV4.supportCookies = (function() {
      document.cookie = "ooyala_cookie_test=true";
      var cookiesSupported = document.cookie.indexOf("ooyala_cookie_test=true") >= 0;
      document.cookie = "ooyala_cookie_test=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      return cookiesSupported;
    }());

    OOV4.isSSL = document.location.protocol == "https:";

    updateServerHost();

    // returns true iff environment-specific feature is required to run in current environment
    OOV4.requiredInEnvironment = OOV4.featureEnabled = function(feature) {
      return !!OOV4.environmentRequiredFeatures.match(new RegExp(feature));
    };

    // Detect Chrome Extension. We will recieve an acknowledgement from the content script, which will prompt us to start sending logs
    OOV4.chromeExtensionEnabled = document.getElementById('ooyala-extension-installed') ? true : false;

    // Locale Getter and Setter
    OOV4.locale = "";
    OOV4.setLocale = function(locale) {
      OOV4.locale = locale.toUpperCase();
    };
    OOV4.getLocale = function() {
      return (OOV4.locale || document.documentElement.lang || navigator.language ||
              navigator.userLanguage || "en").substr(0,2).toUpperCase();
    };
  }(OOV4, OOV4._, OOV4.HM));

},{}],6:[function(require,module,exports){
  (function(OOV4,_,$) {
    OOV4.getRandomString = function() { return Math.random().toString(36).substring(7); };

    OOV4.safeClone = function(source) {
      if (_.isNumber(source) || _.isString(source) || _.isBoolean(source) || _.isFunction(source) ||
          _.isNull(source) || _.isUndefined(source)) {
        return source;
      }
      var result = (source instanceof Array) ? [] : {};
      try {
        $.extend(true, result, source);
      } catch(e) { OOV4.log("deep clone error", e); }
      return result;
    };

    OOV4.d = function() {
      if (OOV4.isDebug) { OOV4.log.apply(OOV4, arguments); }
      OOV4.$("#OOYALA_DEBUG_CONSOLE").append(JSON.stringify(OOV4.safeClone(arguments))+'<br>');
    };

    // Note: This inherit only for simple inheritance simulation, the Parennt class still has a this binding
    // to the parent class. so any variable initiated in the Parent Constructor, will not be available to the
    // Child Class, you need to copy paste constructor to Child Class to make it work.
    // coffeescript is doing a better job here by binding the this context to child in the constructor.
    // Until we switch to CoffeeScript, we need to be careful using this simplified inherit lib.
    OOV4.inherit = function(ParentClass, myConstructor) {
      if (typeof(ParentClass) !== "function") {
        OOV4.log("invalid inherit, ParentClass need to be a class", ParentClass);
        return null;
      }
      var SubClass = function() {
        ParentClass.apply(this, arguments);
        if (typeof(myConstructor) === "function") { myConstructor.apply(this, arguments); }
      };
      var parentClass = new ParentClass();
      OOV4._.extend(SubClass.prototype, parentClass);
      SubClass.prototype.parentClass = parentClass;
      return SubClass;
    };

    var styles = {}; // keep track of all styles added so we can remove them later if destroy is called

    OOV4.attachStyle = function(styleContent, playerId) {
      var s = $('<style type="text/css">' + styleContent + '</style>').appendTo("head");
      styles[playerId] = styles[playerId] || [];
      styles[playerId].push(s);
    };

    OOV4.removeStyles = function(playerId) {
      OOV4._.each(styles[playerId], function(style) {
        style.remove();
      });
    };

    // object: object to get the inner property for, ex. {"mod":{"fw":{"data":{"key":"val"}}}}
    // keylist: list of keys to find, ex. ["mod", "fw", "data"]
    // example output: {"key":"val"}
    OOV4.getInnerProperty = function(object, keylist) {
      var innerObject = object;
      var list = keylist;
      while (list.length > 0) {
        var key = list.shift();
        // Note that function and arrays are objects
        if (_.isNull(innerObject) || !_.isObject(innerObject) ||
            _.isFunction(innerObject) || _.isArray(innerObject))
          return null;
        innerObject = innerObject[key];
      }
      return innerObject;
    }

    OOV4.formatSeconds = function(timeInSeconds) {
      var seconds = parseInt(timeInSeconds,10) % 60;
      var hours = parseInt(timeInSeconds / 3600, 10);
      var minutes = parseInt((timeInSeconds - hours * 3600) / 60, 10);


      if (hours < 10) {
        hours = '0' + hours;
      }

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      if (seconds < 10) {
        seconds = '0' + seconds;
      }

      return (parseInt(hours,10) > 0) ? (hours + ":" + minutes + ":" + seconds) : (minutes + ":" + seconds);
    };

    OOV4.timeStringToSeconds = function(timeString) {
      var timeArray = (timeString || '').split(":");
      return _.reduce(timeArray, function(m, s) { return m * 60 + parseInt(s, 10); }, 0);
    };

    OOV4.leftPadding = function(num, totalChars) {
      var pad = '0';
      var numString = num ? num.toString() : '';
      while (numString.length < totalChars) {
        numString = pad + numString;
      }
      return numString;
    };

    OOV4.getColorString = function(color) {
      return '#' + (OOV4.leftPadding(color.toString(16), 6)).toUpperCase();
    };

    OOV4.hexToRgb = function(hex) {
      var r = (hex & 0xFF0000) >> 16;
      var g = (hex & 0xFF00) >> 8;
      var b = (hex & 0xFF);
      return [r, g, b];
    };

    OOV4.changeColor = function(color, ratio, darker) {
      var minmax     = darker ? Math.max : Math.min;
      var boundary = darker ? 0 : 255;
      var difference = Math.round(ratio * 255) * (darker ? -1 : 1);
      var rgb = OOV4.hexToRgb(color);
      return [
        OOV4.leftPadding(minmax(rgb[0] + difference, boundary).toString(16), 2),
        OOV4.leftPadding(minmax(rgb[1] + difference, boundary).toString(16), 2),
        OOV4.leftPadding(minmax(rgb[2] + difference, boundary).toString(16), 2)
      ].join('');
    };

    OOV4.decode64 = function(s) {
      s = s.replace(/\n/g,"");
      var results = "";
      var j, i = 0;
      var enc = [];
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

      //shortcut for browsers with atob
      if (window.atob) {
        return atob(s);
      }

      do {
        for (j = 0; j < 4; j++) {
          enc[j] = b64.indexOf(s.charAt(i++));
        }
        results += String.fromCharCode((enc[0] << 2) | (enc[1] >> 4),
                                        enc[2] == 64 ? 0 : ((enc[1] & 15) << 4) | (enc[2] >> 2),
                                        enc[3] == 64 ? 0 : ((enc[2] & 3) << 6) | enc[3]);
      } while (i < s.length);

      //trim tailing null characters
      return results.replace(/\0/g, "");
    };

    OOV4.pixelPing = function (url) {
      var img = new Image();
      img.onerror = img.onabort = function() { OOV4.d("onerror:", url); };
      img.src = OOV4.getNormalizedTagUrl(url);
    };

    // ping array of urls.
    OOV4.pixelPings = function (urls) {
        if (_.isEmpty(urls)) { return; }
        _.each(urls, function(url) {
          OOV4.pixelPing(url);
        }, this);
    };

    // helper function to convert types to boolean
    // the (!!) trick only works to verify if a string isn't the empty string
    // therefore, we must use a special case for that
    OOV4.stringToBoolean = function(value) {
      if (typeof value === 'string')
        return (value.toLowerCase().indexOf("true") > -1 || value.toLowerCase().indexOf("yes") > -1);
      return !!value;
    }

    OOV4.regexEscape = function(value) {
      var specials = /[<>()\[\]{}]/g;
      return value.replace(specials, "\\$&");
    };

    OOV4.getNormalizedTagUrl = function (url, embedCode) {
      var ts = new Date().getTime();
      var pageUrl = escape(document.URL);

      var placeHolderReplace = function (template, replaceValue) {
        _.each(template, function (placeHolder) {
          var regexSearchVal = new RegExp("(" +
                                    OOV4.regexEscape(placeHolder) + ")", 'gi');
          url = url.replace(regexSearchVal, replaceValue);
        }, this);
      }

      // replace the timestamp and referrer_url placeholders
      placeHolderReplace(OOV4.TEMPLATES.RANDOM_PLACE_HOLDER, ts);
      placeHolderReplace(OOV4.TEMPLATES.REFERAK_PLACE_HOLDER, pageUrl);

      // first make sure that the embedCode exists, then replace the
      // oo_embedcode placeholder
      if (embedCode) {
        placeHolderReplace(OOV4.TEMPLATES.EMBED_CODE_PLACE_HOLDER, embedCode);
      }
      return url;
    };

    OOV4.safeSeekRange = function(seekRange) {
      return {
        start : seekRange.length > 0 ? seekRange.start(0) : 0,
        end : seekRange.length > 0 ? seekRange.end(0) : 0
      };
    };

    OOV4.loadedJS = OOV4.loadedJS || {};

    OOV4.jsOnSuccessList = OOV4.jsOnSuccessList || {};

    OOV4.safeFuncCall = function(fn) {
      if (typeof fn !== "function") { return; }
      try {
        fn.apply();
      } catch (e) {
        OOV4.log("Can not invoke function!", e);
      }
    };

    OOV4.loadScriptOnce = function(jsSrc, successCallBack, errorCallBack, timeoutInMillis) {
      OOV4.jsOnSuccessList[jsSrc] = OOV4.jsOnSuccessList[jsSrc] || [];
      if (OOV4.loadedJS[jsSrc]) {
        // invoke call back directly if loaded.
        if (OOV4.loadedJS[jsSrc] === "loaded") {
          OOV4.safeFuncCall(successCallBack);
        } else if (OOV4.loadedJS[jsSrc] === "loading") {
          OOV4.jsOnSuccessList[jsSrc].unshift(successCallBack);
        }
        return false;
      }
      OOV4.loadedJS[jsSrc] = "loading";
      $.ajax({
        url: jsSrc,
        type: 'GET',
        cache: true,
        dataType: 'script',
        timeout: timeoutInMillis || 15000,
        success: function() {
          OOV4.loadedJS[jsSrc] = "loaded";
          OOV4.jsOnSuccessList[jsSrc].unshift(successCallBack);
          OOV4._.each(OOV4.jsOnSuccessList[jsSrc], function(fn) {
            OOV4.safeFuncCall(fn);
          }, this);
          OOV4.jsOnSuccessList[jsSrc] = [];
        },
        error: function() {
          OOV4.safeFuncCall(errorCallBack);
        }
      });
      return true;
    };

    try {
      OOV4.localStorage = window.localStorage;
    } catch (err) {
      OOV4.log(err);
    }
    if (!OOV4.localStorage) {
      OOV4.localStorage = {
        getItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
          return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        key: function (nKeyId) {
          return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
        },
        setItem: function (sKey, sValue) {
          if(!sKey) { return; }
          document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
          this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return; }
          document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          this.length--;
        },
        hasOwnProperty: function (sKey) {
          return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
      };
      OOV4.localStorage.length = (document.cookie.match(/\=/g) || OOV4.localStorage).length;
    }

    // A container to properly request OOV4.localStorage.setItem
    OOV4.setItem = function (sKey, sValue) {
      try {
        OOV4.localStorage.setItem(sKey, sValue);
      } catch (err) {
        OOV4.log(err);
      }
    };

    OOV4.JSON = window.JSON;

  }(OOV4, OOV4._, OOV4.$));

},{}],7:[function(require,module,exports){
// Actual Hazmat Code
var HazmatBuilder = function(_,root) {

  // top level module
  var Hazmat  = function(config) {
    this.config = config || {};
    if(!_.isObject(this.config)) {
      throw new Error('Hazmat is not initialized properly');
    }
    this.fail = _.isFunction(this.config.fail) ? this.config.fail : Hazmat.fail;
    this.warn = _.isFunction(this.config.warn) ? this.config.warn : Hazmat.warn;
    this.log = _.isFunction(this.config.log) ? this.config.log : Hazmat.log;
  };

  _.extend(Hazmat, {

    // constants
    ID_REGEX : /^[\_A-Za-z0-9]+$/,

    // factory
    create : function(config) {
      return new Hazmat(config);
    },

    // noConflict
    noConflict : function() {
      root.Hazmat = Hazmat.original;
      return Hazmat;
    },

    // default log function
    log : function() {
      if(console && _.isFunction(console.log)) {
        console.log.apply(console, arguments);
      }
    },

    // default fail function
    fail : function(_reason, _data) {
      var reason = _reason || "", data = _data || {};
      Hazmat.log('Hazmat Failure::', reason, data);
      throw new Error('Hazmat Failure '+reason.toString());
    },

    // default warn function
    warn : function(_reason, _data) {
      var reason = _reason || "", data = _data || {};
      Hazmat.log('Hazmat Warning::', reason, data);
    },

    // global fixers
    fixDomId : function(_value) {
      if(_.isString(_value) && _value.length > 0) {
        return _value.replace(/[^A-Za-z0-9\_]/g,'');
      } else {
        return null;
      }
    },

    // global testers
    isDomId : function(value) {
      return _.isString(value) && value.match(Hazmat.ID_REGEX);
    },


    __placeholder : true
  });

  _.extend(Hazmat.prototype, {
    _safeValue : function(name, value, fallback, type) {
      // make fallback safe and eat exceptions
      var _fallback = fallback;
      if(_.isFunction(fallback)) {
        fallback = _.once(function() {
          try {
            return _fallback.apply(this, arguments);
          } catch(e) {
          }
        });
      }

      if(type.checker(value)) {
        return value;
      } else if(type.evalFallback && _.isFunction(fallback) && type.checker(fallback(value))){
        this.warn('Expected valid '+type.name+' for '+name+' but was able to sanitize it:', [value, fallback(value)]);
        return fallback(value);
      } else if(type.checker(_fallback)){
        this.warn('Expected valid '+type.name+' for '+name+' but was able to fallback to default value:', [value, _fallback]);
        return _fallback;
      } else {
        this.fail('Expected valid '+type.name+' for '+name+' but received:', value);
      }
    },

    safeString : function(name, value, fallback) {
      return this._safeValue(name, value, fallback, {name: 'String', checker: _.isString, evalFallback:true});
    },

    safeStringOrNull : function(name, value, fallback) {
      if(value == null) {
        return value;
      } else {
        return this._safeValue(name, value, fallback, {name: 'String', checker: _.isString, evalFallback:true});
      }
    },

    safeDomId : function(name, value, fallback) {
      return this._safeValue(name, value, fallback, {name: 'DOM ID', checker: Hazmat.isDomId, evalFallback:true});
    },

    safeFunction : function(name, value, fallback) {
      return this._safeValue(name, value, fallback, {name: 'Function', checker: _.isFunction, evalFallback:false});
    },

    safeFunctionOrNull : function(name, value, fallback) {
      if(value == null) {
        return value;
      } else {
        return this._safeValue(name, value, fallback, {name: 'Function', checker: _.isFunction, evalFallback:false});
      }
    },

    safeObject : function(name, value, fallback) {
      return this._safeValue(name, value, fallback, {name: 'Object', checker: _.isObject, evalFallback:false});
    },

    safeObjectOrNull : function(name, value, fallback) {
      if(value == null) {
        return value;
      } else {
        return this._safeValue(name, value, fallback, {name: 'Object', checker: _.isObject, evalFallback:false});
      }
    },
    
    safeArray : function(name, value, fallback) {
      return this._safeValue(name, value, fallback, {name: 'Array', checker: _.isArray, evalFallback:false});
    },
    
    safeArrayOfElements : function(name, value, elementValidator, fallback) {
      var safeArray = this._safeValue(name, value, fallback, {name: 'Array', checker: _.isArray, evalFallback:false});
      return _.map(safeArray, elementValidator);
    },

    __placeholder:true
  });

  return Hazmat;
};

// Integration with Node.js/Browser
if(typeof window !== 'undefined' && typeof window._ !== 'undefined') {
  var hazmat = HazmatBuilder(window._, window);
  hazmat.original = window.Hazmat;
  window.Hazmat = hazmat;
} else {
  var _ = require('underscore');
  var hazmat = HazmatBuilder(_);
  _.extend(exports,hazmat);
}

},{"underscore":8}],8:[function(require,module,exports){
//     Underscore.js 1.3.3
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.3';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      rand = Math.floor(Math.random() * (index + 1));
      shuffled[index] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, val, context) {
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      if (a === void 0) return 1;
      if (b === void 0) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj)                                     return [];
    if (_.isArray(obj))                           return slice.call(obj);
    if (_.isArguments(obj))                       return slice.call(obj);
    if (obj.toArray && _.isFunction(obj.toArray)) return obj.toArray();
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var results = [];
    // The `isSorted` flag is irrelevant if the array only contains two elements.
    if (array.length < 3) isSorted = true;
    _.reduce(initial, function (memo, value, index) {
      if (isSorted ? _.last(memo) !== value || !memo.length : !_.include(memo, value)) {
        memo.push(value);
        results.push(array[index]);
      }
      return memo;
    }, []);
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1), true);
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        result = func.apply(context, args);
      }
      whenDone();
      throttling = true;
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var result = {};
    each(_.flatten(slice.call(arguments, 1)), function(key) {
      if (key in obj) result[key] = obj[key];
    });
    return result;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return _.isNumber(obj) && isFinite(obj);
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\': '\\',
    "'": "'",
    'r': '\r',
    'n': '\n',
    't': '\t',
    'u2028': '\u2028',
    'u2029': '\u2029'
  };

  for (var p in escapes) escapes[escapes[p]] = p;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults(settings || {}, _.templateSettings);

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
      .replace(escaper, function(match) {
        return '\\' + escapes[match];
      })
      .replace(settings.escape || noMatch, function(match, code) {
        return "'+\n_.escape(" + unescape(code) + ")+\n'";
      })
      .replace(settings.interpolate || noMatch, function(match, code) {
        return "'+\n(" + unescape(code) + ")+\n'";
      })
      .replace(settings.evaluate || noMatch, function(match, code) {
        return "';\n" + unescape(code) + "\n;__p+='";
      }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __p='';" +
      "var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" +
      source + "return __p;\n";

    var render = new Function(settings.variable || 'obj', '_', source);
    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for build time
    // precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' +
      source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OOV4-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);

},{}],9:[function(require,module,exports){
/*
 * Plugin for bitdash player by Bitmovin GMBH
 * This player is used for demo purposes only. Access can be revoked at any time
 */

require("../../../html5-common/js/utils/InitModules/InitOO.js");
require("../../../html5-common/js/utils/InitModules/InitOOUnderscore.js");
require("../../../html5-common/js/utils/InitModules/InitOOHazmat.js");
require("../../../html5-common/js/utils/constants.js");
require("../../../html5-common/js/utils/utils.js");
require("../../../html5-common/js/utils/environment.js");
require("./helpers/polifillRequestAnimationFrame.js");

if (window.runningUnitTests) {
  bitmovinPlayer = function(domId) {
    return player;
  };

  bitmovinPlayer.VR = {};
  bitmovinPlayer.VR.CONTENT_TYPE = {};
  bitmovinPlayer.VR.CONTENT_TYPE.SINGLE = "2d";

  bitmovinPlayer.EVENT = {};
  bitmovinPlayer.EVENT.ON_AUDIO_ADAPTATION = "onAudioAdaptation";
  bitmovinPlayer.EVENT.ON_AUDIO_CHANGED = "onAudioChanged";
  bitmovinPlayer.EVENT.ON_AUDIO_DOWNLOAD_QUALITY_CHANGED = "onAudioDownloadQualityChanged";
  bitmovinPlayer.EVENT.ON_AUDIO_PLAYBACK_QUALITY_CHANGED = "onAudioPlaybackQualityChanged";
  bitmovinPlayer.EVENT.ON_CUE_ENTER = "onCueEnter";
  bitmovinPlayer.EVENT.ON_CUE_EXIT = "onCueExit";
  bitmovinPlayer.EVENT.ON_DOWNLOAD_FINISHED = "onDownloadFinished";
  bitmovinPlayer.EVENT.ON_DVR_WINDOW_EXCEEDED = "onDVRWindowExceeded";
  bitmovinPlayer.EVENT.ON_ERROR = "onError";
  bitmovinPlayer.EVENT.ON_FULLSCREEN_ENTER = "onFullscreenEnter";
  bitmovinPlayer.EVENT.ON_FULLSCREEN_EXIT = "onFullscreenExit";
  bitmovinPlayer.EVENT.ON_METADATA = "onMetadata";
  bitmovinPlayer.EVENT.ON_MUTED = "onMuted";
  bitmovinPlayer.EVENT.ON_PAUSED = "onPaused";
  bitmovinPlayer.EVENT.ON_PERIOD_SWITCHED = "onPeriodSwitched";
  bitmovinPlayer.EVENT.ON_PLAY = "onPlay";
  bitmovinPlayer.EVENT.ON_PLAYING = "onPlaying";
  bitmovinPlayer.EVENT.ON_PLAYBACK_FINISHED = "onPlaybackFinished";
  bitmovinPlayer.EVENT.ON_PLAYER_RESIZE = "onPlayerResize";
  bitmovinPlayer.EVENT.ON_READY = "onReady";
  bitmovinPlayer.EVENT.ON_SEEK = "onSeek";
  bitmovinPlayer.EVENT.ON_SEEKED = "onSeeked";
  bitmovinPlayer.EVENT.ON_SEGMENT_REQUEST_FINISHED = "onSegmentRequestFinished";
  bitmovinPlayer.EVENT.ON_SOURCE_LOADED = "onSourceLoaded";
  bitmovinPlayer.EVENT.ON_SOURCE_UNLOADED = "onSourceUnloaded";
  bitmovinPlayer.EVENT.ON_STALL_STARTED = "onStallStarted";
  bitmovinPlayer.EVENT.ON_STALL_ENDED = "onStallEnded";
  bitmovinPlayer.EVENT.ON_SUBTITLE_ADDED = "onSubtitleAdded";
  bitmovinPlayer.EVENT.ON_SUBTITLE_CHANGED = "onSubtitleChanged";
  bitmovinPlayer.EVENT.ON_SUBTITLE_REMOVED = "onSubtitleRemoved";
  bitmovinPlayer.EVENT.ON_TIME_CHANGED = "onTimeChanged";
  bitmovinPlayer.EVENT.ON_TIME_SHIFT = "onTimeShift";
  bitmovinPlayer.EVENT.ON_TIME_SHIFTED = "onTimeShifted";
  bitmovinPlayer.EVENT.ON_UNMUTED = "onUnmuted";
  bitmovinPlayer.EVENT.ON_VIDEO_ADAPTATION = "onVideoAdaptation";
  bitmovinPlayer.EVENT.ON_VIDEO_DOWNLOAD_QUALITY_CHANGED = "onVideoDownloadQualityChanged";
  bitmovinPlayer.EVENT.ON_VIDEO_PLAYBACK_QUALITY_CHANGED = "onVideoPlaybackQualityChanged";
  bitmovinPlayer.EVENT.ON_VOLUME_CHANGED = "onVolumeChanged";
  bitmovinPlayer.EVENT.ON_VR_ERROR = "onVRError";
  bitmovinPlayer.EVENT.ON_VR_MODE_CHANGED = "onVrModeChanged";
  bitmovinPlayer.EVENT.ON_VR_STEREO_CHANGED = "onVrStereoChanged";
  bitmovinPlayer.EVENT.ON_VR_VIEWING_DIRECTION_CHANGE = "_onVrViewingDirectionChanging";
  bitmovinPlayer.EVENT.ON_VR_VIEWING_DIRECTION_CHANGED = "_onVrViewingDirectionChanged";
  bitmovinPlayer.EVENT.ON_WARNING = "onWarning";
} else {
  bitmovinPlayer = require("../lib/bitmovinplayer.js");
}

BITDASH_TECHNOLOGY = {
  FLASH: "flash",
  HTML5: "html5",
  NATIVE: "native"
};

BITDASH_STREAMING = {
  HLS: "hls",
  DASH: "dash",
  PROGRESSIVE: "progressive"
};

BITDASH_FILES = {
  FLASH: 'bitmovinplayer.swf',
  VR: 'bitmovinplayer-vr.js',
  UI: 'bitmovinplayer-ui.js',
  UI_CSS: 'bitmovinplayer-ui.css'
};

DEFAULT_TECHNOLOGY = BITDASH_TECHNOLOGY.HTML5;

(function(_, $) {
  var pluginName = "bit-wrapper";
  var BITDASH_LIB_TIMEOUT = 30000;

  var hasFlash = function() {
    var flashVersion = parseInt(getFlashVersion().split(',').shift());
    return isNaN(flashVersion) ? false : (flashVersion < 11 ? false : true);
  };

  var getFlashVersion = function() {
    if (window.runningUnitTests) {
      return window.FLASH_VERSION;
    } else {
      // ie
      try {
        try {
          var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
          try {
            axo.AllowScriptAccess = 'always';
          } catch(e) {
            return '6,0,0';
          }
        } catch(e) {
        }
        return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
        // other browsers
      } catch(e) {
        try {
          if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
            return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
          }
        } catch(e) {
        }
      }
      return '0,0,0';
    }
  };

  var BITDASH_WARNING_CODES = {
    USER_INTERACTION_REQUIRED: 5008
  };

  /*
   * HTML5 Media Error Constants:
   *   MediaError.MEDIA_ERR_ABORTED = 1
   *   MediaError.MEDIA_ERR_NETWORK = 2
   *   MediaError.MEDIA_ERR_DECODE = 3
   *   MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED = 4
   *   MediaError.MEDIA_ERR_ENCRYPTED = 5 (Chrome only)
   *   Ooyala Extensions:
   *   NO_STREAM = 0
   *   UNKNOWN = -1
   *   DRM_ERROR = 6
   */

  // error code and message information is taken from https://bitmovin.com/errors/
  var bitdashErrorCodes = {
    '3029': {
      shortText: "Native HLS stream error",
      longText: "An unknown error occurred using the browser’s built-in HLS support.",
      ooErrorCode: 0 // NO_STREAM
    },
    '3028': {
      shortText: "Progressive stream error",
      longText: "The progressive stream type is not supported or the stream has an error.",
      ooErrorCode: 0 // NO_STREAM
    },
    '3027': {
      shortText: "DRM certificate error",
      longText: "An unknown error with the downloaded DRM certificate occurred.",
      ooErrorCode: 6 // DRM_ERROR
    },
    '3026': {
      shortText: "Progressive stream timeout",
      longText: "The progressive stream timed out.",
      ooErrorCode: 0 // NO_STREAM
    },
    '3025': {
      shortText: "Segment download timeout",
      longText: "The request to download the segment timed out.",
      ooErrorCode: 0 // NO_STREAM
    },
    '3024': {
      shortText: "Manifest download timeout",
      longText: "The request to download the manifest file timed out.",
      ooErrorCode: 0 // NO_STREAM
    },
    '3023': {
      shortText: "Network error",
      longText: "A network error occurred. The reason might be: CORS is not enabled, No Internet connection, Domain name could not be resolved, The server refused the connection",
      ooErrorCode: 2 // MediaError.MEDIA_ERR_NETWORK
    },
    '3022': {
      shortText: "Manifest error",
      longText: "An unknown error occurred parsing the manifest file.",
      ooErrorCode: -1 // UNKNOWN
    },
    '3021': {
      shortText: "DRM system not supported",
      longText: "The chosen DRM system is not supported in the current browser.",
      ooErrorCode: 6 // DRM_ERROR
    },
    '3020': {
      shortText: "DRM key error",
      longText: "An error occured with the key returned by the DRM license server.",
      ooErrorCode: 6 // DRM_ERROR
    },
    '3019': {
      shortText: "DRM certificate requested failed",
      longText: "The request to receive the DRM certificate failed.",
      ooErrorCode: 6 // DRM_ERROR
    },
    '3018': {
      shortText: "Could not create MediaKeys",
      longText: "Could not create DRM MediaKeys to decrypt the content.",
      ooErrorCode: 6 // DRM_ERROR
    },
    '3017': {
      shortText: "Could not create key session",
      longText: "Creating a DRM key session was not successful.",
      ooErrorCode: 6 // DRM_ERROR
    },
    '3016': {
      shortText: "Could not create key system",
      longText: "The DRM system in the current browser can not be used with the current data.",
      ooErrorCode: 6 // DRM_ERROR
    },
    '3015': {
      shortText: "Unsupported codec or file format",
      longText: "The codec and/or file format of the audio or video stream is not supported by the HTML5 player.",
      ooErrorCode: 4 // MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
    },
    '3014': {
      shortText: "Key size not supported",
      longText: "The size of the given key to decrypt the content is not supported.",
      ooErrorCode: 3 // MediaError.MEDIA_ERR_DECODE
    },
    '3013': {
      shortText: "Decryption Key or KeyID missing",
      longText: "The key or the key ID to decrypt the content is missing",
      ooErrorCode: OOV4.isChrome ? 5 /* MediaError.MEDIA_ERR_ENCRYPTED */ : 3 /* MediaError.MEDIA_ERR_DECODE */
    },
    '3012': {
      shortText: "Invalid header pair for DRM",
      longText: "The given header name/value pair for a DRM license request was invalid.",
      ooErrorCode: 6 // DRM_ERROR
    },
    '3011': {
      shortText: "DRM license request failed",
      longText: "Requesting a DRM license failed.",
      ooErrorCode: 6 // DRM_ERROR
    },
    '3010': {
      shortText: "Error synchronizing streams",
      longText: "A problem occurred when the player tried to synchronize streams. This could result in the content being/running out of sync.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '3009': {
      shortText: "Maximum retries exceeded",
      longText: "The maximum number of retries for a download was exceeded.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '3007': {
      shortText: "Subitles or captions can not be loaded",
      longText: "The specified subitles/captions file could not be loaded.",
      ooErrorCode: 0 // NO_STREAM
    },
    '3006': {
      shortText: "Manifest can not be loaded",
      longText: "The DASH or HLS manifest file could not be loaded.",
      ooErrorCode: 0 // NO_STREAM
    },
    '3005': {
      shortText: "No manifest URL",
      longText: "No URL to a DASH or HLS manifest was given.",
      ooErrorCode: 0 // NO_STREAM
    },
    '3004': {
      shortText: "Could not find segment URL",
      longText: "Could not find/build the URL to download a segment.",
      ooErrorCode: 0 // NO_STREAM
    },
    '3003': {
      shortText: "Unsupported TFDT box version",
      longText: "The version of the ‘TFDT’ box in the mp4 container is not supported.",
      ooErrorCode: -1 // UNKNOWN
    },
    '3002': {
      shortText: "Segment contains no data",
      longText: "The downloaded media segment does not contain data.",
      ooErrorCode: 0 // NO_STREAM
    },
    '3001': {
      shortText: "Unsupported manifest format",
      longText: "The format of the downloaded manifest file is not supported.",
      ooErrorCode: 3 // MediaError.MEDIA_ERR_DECODE
    },
    '3000': {
      shortText: "Unknown HTML5 error",
      longText: "An unknown error happened in the HTML5 player.",
      ooErrorCode: -1 // UNKNOWN
    },
    '2015': {
      shortText: "Unsupported codec or file format",
      longText: "The codec and/or file format of the audio or video stream is not supported by the Flash player.",
      ooErrorCode: 3 // MediaError.MEDIA_ERR_DECODE
    },
    '2008': {
      shortText: "Adobe Access DRM Error",
      longText: "An error with Adobe Access DRM occurred in the Flash player.",
      ooErrorCode: 6 // DRM_ERROR
    },
    '2007': {
      shortText: "Segment can not be loaded",
      longText: "The Flash player could not load a DASH or HLS segment.",
      ooErrorCode: 0 // NO_STREAM
    },
    '2006': {
      shortText: "Manifest can not be loaded",
      longText: "The Flash player was unable to load the DASH or HLS manifest.",
      ooErrorCode: 0 // NO_STREAM
    },
    '2001': {
      shortText: "Unknown Flash error with details",
      longText: "General unknown error from the Flash player where additional information is available.",
      ooErrorCode: -1 // UNKNOWN
    },
    '2000': {
      shortText: "Unknown flash error",
      longText: "General unknown error from the Flash player.",
      ooErrorCode: -1 // UNKNOWN
    },
    '1017': {
      shortText: "License not compatible with domain",
      longText: "The currently used domain is not valid in combination with the used license.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '1016': {
      shortText: "License error",
      longText: "License error.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '1015': {
      shortText: "Forced player is not supported",
      longText: "The forced player is not supported.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '1014': {
      shortText: "Player type is unknown",
      longText: "The specified player type is unknown.",
      ooErrorCode: 1 // UNKNOWN
    },
    '1013': {
      shortText: "Stream type is not supported",
      longText: "The specified stream type is not supported.",
      ooErrorCode: 4 // MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
    },
    '1012': {
      shortText: "Player files can not be loaded",
      longText: "The JavaScript player files can not be loaded.",
      ooErrorCode: 2 // MediaError.MEDIA_ERR_NETWORK
    },
    '1011': {
      shortText: "No valid configuration object",
      longText: "No valid configuration object was provided.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '1010': {
      shortText: "Unsupported protocol",
      longText: "The site has been loaded using the unsupported “file” protocol.",
      ooErrorCode: 4 // MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
    },
    '1009': {
      shortText: "Skin can not be loaded",
      longText: "The specified skin can not be loaded.",
      ooErrorCode: 2 // MediaError.MEDIA_ERR_NETWORK
    },
    '1008': {
      shortText: "Domain error",
      longText: "The domain lock of the player is not valid for the current domain.",
      ooErrorCode: 2 // MediaError.MEDIA_ERR_NETWORK
    },
    '1007': {
      shortText: "Flash player version not supported",
      longText: "The used Flash player version is not supported.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '1006': {
      shortText: "No supported technology was detected",
      longText: "No supported technology was detected, i.e. neither Flash nor the MediaSource Extension was found and no HLS manifest was given or HLS is also not supported.",
      ooErrorCode: 4 // MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
    },
    '1005': {
      shortText: "Flash creation error",
      longText: "An error occurred during creating the flash player.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '1004': {
      shortText: "HTML video element error",
      longText: "There was an error when inserting the HTML video element.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '1003': {
      shortText: "No stream provided",
      longText: "No streams have been provided within the source part of the configuration.",
      ooErrorCode: 0 // NO_STREAM
    },
    '1002': {
      shortText: "Key error",
      longText: "The key within the configuration object of the player is not correct.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '1000': {
      shortText: "Unknown error",
      longText: "General unknown error.",
      ooErrorCode: -1 // UNKNOWN
    },
    '900': {
      shortText: "Undefined VAST error",
      longText: "Undefined VAST error.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    },
    '403': {
      shortText: "No supported VAST media file found",
      longText: "Couldn’t find MediaFile that is supported by this video player, based on the attributes of the MediaFile element.",
      ooErrorCode: 0 // NO_STREAM
    },
    '303': {
      shortText: "No VAST response",
      longText: "No ads VAST response after one or more wrappers.",
      ooErrorCode: 1 // MediaError.MEDIA_ERR_ABORTED
    }
  };

  /**
   * @class BitdashVideoFactory
   * @classdesc Factory for creating bitdash player objects that use HTML5 video tags.
   * @property {string} name The name of the plugin
   * @property {object} encodings An array of supported encoding types (ex. OOV4.VIDEO.ENCODING.DASH)
   * @property {object} features An array of supported features (ex. OOV4.VIDEO.FEATURE.CLOSED_CAPTIONS)
   * @property {string} technology The core video technology (ex. OOV4.VIDEO.TECHNOLOGY.HTML5)
   */
  var BitdashVideoFactory = function() {
    this.name = pluginName;
    this.technology = (function() {
      if (OOV4.isIos || OOV4.isAndroid) {
        return OOV4.VIDEO.TECHNOLOGY.HTML5;
      }
      return OOV4.VIDEO.TECHNOLOGY.MIXED;
    })();
    this.features = [ OOV4.VIDEO.FEATURE.CLOSED_CAPTIONS, OOV4.VIDEO.FEATURE.BITRATE_CONTROL ];

    /**
     * Determines which encoding types are supported on the current platform.
     * @public
     * @method BitdashVideoFactory#getSupportedEncodings
     * @returns {object} Returns an array of strings containing the encoding types supported from a list of
     *   encodings found in object OOV4.VIDEO.ENCODING.
     */
    this.getSupportedEncodings = function() {
      // [PLAYER-1090] - NPAW showed many playback failures for users on Windows 7, Chrome 48.0.2564.109
      // using Bitmovin 6.1.17 for Accuweather. For now, we'll return an empty array here so we can fallback
      // to main_html5
      if (OOV4.chromeMajorVersion === 48) {
        return [];
      }

      var encodes = [];

      var vid, testPlayer;

      try {
        // iOS will be unblocked in [PLAYER-554]
        // We do not want to enable Bitmovin for iOS yet.
        if (!OOV4.isIos) {
          //Bitmovin requires a video element that is in the DOM
          vid = document.createElement('video');
          vid.id = _.uniqueId();
          //TODO: Is there a better place to attach the video element?
          //We do not have access to our video player container, which would
          //be more ideal to use instead
          vid.style.display = 'none';
          document.documentElement.appendChild(vid);
          testPlayer = bitmovinPlayer(vid.id);

          //The getSupportedDRM API returns a promise, which is async.
          //We'll see if we can work in usage of this API at a later time.
          //For now, we'll rely on the super matrix to determine DRM
          //support. This matrix is found at:
          //https://docs.google.com/spreadsheets/d/1B7COivptOQ1WTJ6CLO8Y0yn2mxwuRBTdb-Ja4haANIE/edit#gid=956330529

          //Supported values for bitmovin v6 supported tech
          //found at: https://bitmovin.com/player-documentation/player-configuration-v6/
          /*
           { player: 'html5', streaming: 'dash'}
           { player: 'html5', streaming: 'hls'}
           { player: 'native', streaming: 'hls'}
           { player: 'flash', streaming: 'dash'}
           { player: 'flash', streaming: 'hls'}
           { player: 'native', streaming: 'progressive'}
           */
          var supportedTech = testPlayer.getSupportedTech();
          var tech;
          for (var i = 0; i < supportedTech.length; i++) {
            tech = supportedTech[i];
            switch (tech.streaming) {
              case BITDASH_STREAMING.DASH:
                // DASH support is still buggy on Safari as of Bitmovin 7.2.x
                if (!OOV4.isSafari) {
                  encodes.push(OOV4.VIDEO.ENCODING.DASH);
                  //TODO: Replace with bitplayer.getSupportedDRM()
                  if (OOV4.supportMSE) {
                    encodes.push(OOV4.VIDEO.ENCODING.DRM.DASH);
                  }
                }
                break;
              case BITDASH_STREAMING.HLS:
                // Will be unblocked in [PLAYER-555]
                // We do not want to enable HLS for Android yet.
                if ((!OOV4.isAndroid && !OOV4.isAndroid4Plus) || this.allowAndroidHls) {
                  encodes.push(OOV4.VIDEO.ENCODING.HLS);
                  encodes.push(OOV4.VIDEO.ENCODING.AKAMAI_HD2_VOD_HLS);
                  encodes.push(OOV4.VIDEO.ENCODING.AKAMAI_HD2_HLS);
                  //TODO: Replace with bitplayer.getSupportedDRM()
                  if (OOV4.isSafari) {
                    encodes.push(OOV4.VIDEO.ENCODING.DRM.HLS);
                  }
                }
                break;
              case BITDASH_STREAMING.PROGRESSIVE:
                encodes.push(OOV4.VIDEO.ENCODING.MP4);
                break;
            }
          }
        }
      } catch (e) {
        OOV4.log("Bitmovin getSupportedTech error: " + e);
        //return the default supported encodings
        encodes = encodes.concat(_getHTML5Encodings());
        encodes = encodes.concat(_getFlashEncodings());
      }

      if (testPlayer) {
        testPlayer.destroy();
      }

      if (vid && vid.parentNode) {
        vid.parentNode.removeChild(vid);
      }

      //get rid of duplicates
      encodes = _.uniq(encodes);

      return encodes;
    };

    /**
     * Determines which encoding types are supported in HTML5
     * @private
     * @method BitdashVideoFactory#_getHTML5Encodings
     * @returns {object} Returns an array of strings containing the encoding types supported from a list of
     *   encodings found in object OOV4.VIDEO.ENCODING.
     */
    var _getHTML5Encodings = _.bind(function(){
      var encodes = [];

      // iOS will be unblocked in [PLAYER-554]
      // We do not want to enable Bitmovin for iOS yet.
      if (OOV4.isIos) {
        return encodes;
      }

      //TODO: Move to utils
      var element = document.createElement('video');

      //Following checks are from: http://html5test.com/ and
      //https://bitmovin.com/browser-capabilities/ for DRM checks

      // HTML5 encodings:
      // Our Selenium tests will need to test the following section checking
      // element support

      //TODO: See if we can remove the DRM encodings and rely on Bitmovin to check using
      //bitplayer.getSupportedDRM() API

      //TODO: canPlayType returns possible values of "probably", "maybe", and ""
      //Is it safe to treat "probably" and "maybe" values the same?
      var supportsDash = !!element.canPlayType && element.canPlayType('application/dash+xml') != '';
      var supportsHLS = !!element.canPlayType && element.canPlayType('application/vnd.apple.mpegURL') != '';
      //TODO: Add check for application/x-mpegurl for non-Safari, non-MSE HLS support if necessary
      //TODO: check if MSE support means HLS support across all browsers

      // DASH support is still buggy on Safari as of Bitmovin 7.2.x
      if (supportsDash && !OOV4.isSafari) {
        encodes.push(OOV4.VIDEO.ENCODING.DASH);
        //TODO: Replace with bitplayer.getSupportedDRM()
        encodes.push(OOV4.VIDEO.ENCODING.DRM.DASH);
      }

      // Will be unblocked in [PLAYER-555]
      // We do not want to enable HLS for Android yet.
      if ((supportsHLS || OOV4.supportMSE) && ((!OOV4.isAndroid && !OOV4.isAndroid4Plus) || this.allowAndroidHls)) {
        encodes.push(OOV4.VIDEO.ENCODING.HLS);
        encodes.push(OOV4.VIDEO.ENCODING.AKAMAI_HD2_VOD_HLS);
        encodes.push(OOV4.VIDEO.ENCODING.AKAMAI_HD2_HLS);
        //TODO: Replace with bitplayer.getSupportedDRM()
        if (OOV4.isSafari) {
          encodes.push(OOV4.VIDEO.ENCODING.DRM.HLS);
        }
      }

      encodes.push(OOV4.VIDEO.ENCODING.MP4);

      return encodes;
    }, this);

    /**
     * Determines which encoding types are supported in Flash
     * @private
     * @method BitdashVideoFactory#_getFlashEncodings
     * @returns {object} Returns an array of strings containing the encoding types supported from a list of
     *   encodings found in object OOV4.VIDEO.ENCODING.
     */
    var _getFlashEncodings = _.bind(function() {
      var encodes = [];

      // iOS will be unblocked in [PLAYER-554]
      // We do not want to enable Bitmovin for iOS yet.
      if (OOV4.isIos) {
        return encodes;
      }

      // FLASH encodings:
      // Flash support found at: https://bitmovin.com/browser-capabilities/
      // Will be unblocked in [PLAYER-555]
      // We do not want to enable HLS for Android yet.
      if (hasFlash() && !(OOV4.isAndroid4Plus && OOV4.isChrome)) {
        encodes.push(OOV4.VIDEO.ENCODING.HLS);
        encodes.push(OOV4.VIDEO.ENCODING.AKAMAI_HD2_VOD_HLS);
        encodes.push(OOV4.VIDEO.ENCODING.AKAMAI_HD2_HLS);
        //TODO: Replace with bitplayer.getSupportedDRM()
        if (OOV4.isSafari) {
          encodes.push(OOV4.VIDEO.ENCODING.DRM.HLS);
        }
      }
      // DASH support is still buggy on Safari as of Bitmovin 7.2.x,
      // we exclude it even when using Flash for consistency
      if (!OOV4.isSafari) {
        encodes.push(OOV4.VIDEO.ENCODING.DASH);
        //TODO: Replace with bitplayer.getSupportedDRM()
        if (OOV4.isChrome || OOV4.isEdge || OOV4.isIE11Plus || OOV4.isFirefox) {
          encodes.push(OOV4.VIDEO.ENCODING.DRM.DASH);
        }
      }
      encodes.push(OOV4.VIDEO.ENCODING.MP4);

      return encodes;
    }, this);

    /**
     * Determines if html5 hls is allowed on android from document script tag attributes
     * @private
     * @method BitdashVideoFactory#_getAndroidHlsAllowed
     * @returns {boolean} returns true if allowAndroidHtml5HLS is set to true on one of the document scripts.
     */
    var _getAndroidHlsAllowed = _.bind(function() {
      var scripts = document.getElementsByTagName("script");
      var i;
      for (i = 0; i < scripts.length; i++) {
        if (scripts[i].getAttribute('OOV4.allowAndroidHtml5HLS') === "true"){
          return true;
        }
      }
      return false;
    }, this);


    this.allowAndroidHls = _getAndroidHlsAllowed();
    this.encodings = this.getSupportedEncodings();

    /**
     * Creates a video player instance using BitdashVideoWrapper.
     * @public
     * @method BitdashVideoFactory#create
     * @param {object} parentContainer The jquery div that should act as the parent for the video element
     * @param {string} domId The id of the video player instance to create
     * @param {object} ooyalaVideoController A reference to the video controller in the Ooyala player
     * @param {object} css The css to apply to the video element
     * @param {string} playerId An id that represents the player instance
     * @param {object} pluginParams A set of optional plugin-specific configuration values
     * @returns {object} A reference to the wrapper for the newly created element
     */
    this.create = function(parentContainer, domId, ooyalaVideoController, css, playerId, pluginParams) {
      var videoWrapper = $("<div>");
      videoWrapper.attr("id", domId);
      videoWrapper.css(css);

      parentContainer.append(videoWrapper);
      var wrapper = new BitdashVideoWrapper(domId, ooyalaVideoController, videoWrapper[0], null, pluginParams);
      wrapper.allowAndroidHls = this.allowAndroidHls;
      return wrapper;
    };

    /**
     * Destroys the video technology factory.
     * @public
     * @method BitdashVideoFactory#destroy
     */
    this.destroy = function() {
      this.encodings = [];
      this.create = function() {};
    };

    /**
     * Represents the max number of support instances of video elements that can be supported on the
     * current platform. -1 implies no limit.
     * @public
     * @property BitdashVideoFactory#maxSupportedElements
     */
    this.maxSupportedElements = -1;
  };

  /**
   * @class BitdashVideoWrapper
   * @classdesc Player object that wraps the video element.
   * @param {string} domId The id of the video player instance
   * @param {object} videoController A reference to the Ooyala Video Tech Controller
   * @param {object} videoWrapper div element that will host player DOM objects
   * @param {boolean} disableNativeSeek When true, the plugin should supress or undo seeks that come from
   *                                       native video controls
   * @param {object} pluginParams A set of optional plugin-specific configuration values
   */
  var BitdashVideoWrapper = function(domId, videoController, videoWrapper, disableNativeSeek, pluginParams) {
    this.controller = videoController;
    this.disableNativeSeek = disableNativeSeek || false;
    this.allowAndroidHls = false;
    this.player = null;
    this.vrViewingDirection = {yaw: 0, roll: 0, pitch: 0};
    this.startVrViewingDirection = {yaw: 0, roll: 0, pitch: 0};
    this.isVideoMoving = false;

    // data
    var _domId = domId;
    var _videoWrapper = videoWrapper;
    var _videoElement = null;
    var _currentUrl = '';
    var _currentTech = null;
    var _isM3u8 = false;
    var _isDash = false;
    var _isMP4 = false;
    var _trackId = null;
    var _vtcBitrates = {};
    var _currentBitRate = '';
    var _currentTime = 0;
    var _initialTimeToReach = 0;
    var _ccWrapper = null;
    var _ccVisible = false;
    var _hasDRM = false;
    var _drm = {};
    var _playerSetupPromise = null;
    var _playerLoadPromise = null;
    var _currentClosedCaptionsData = null;

    // states
    var _initialized = false;
    var _loaded = false;
    var _hasPlayed = false;
    var _willPlay = false;
    var _videoEnded = false;
    var _priming = false;
    var _seekTime = null;
    var _isSeeking = false;
    var _shouldPause = false;
    var _setVolume = -1;
    var _setMute = false;
    var _checkedUnmutedPlayback = false;
    var _adsPlayed = false;
    var _captionsDisabled = false;
    var _playerSetup = false;
    var _loadSourceRequested = false;
    var _requestAnimationId = null;
    var _stepDirection = { dx: 36, dy: 36, phi: 0 }; // degrees

    var conf = {
      key: this.controller.PLUGIN_MAGIC,
      style: {
        width: '100%',
        height: '100%',
        subtitlesHidden: true,
        ux: false
      },
      playback: {
        autoplay: false,
        preferredTech: []
      },
      logs: {
        bitmovin: false
      }
    };

    /**
     * Extends the default Bitmovin configuration with values from the pluginParams
     * object that is passed during plugin initialization.
     * @param  {object} bmConfig The Bitmovin player configuration object
     * @param  {object} params The pluginParams object that contains additional configuration options
     */
    var _applyPluginParams = function(bmConfig, params) {
      if (!bmConfig || _.isEmpty(params)) {
        return;
      }
      var baseUrlLocation = {};
      var explicitLocation = {};

      // locationBaseUrl is a custom feature that we added for Valhalla. It's not an
      // actual Bitmovin configuration parameter.
      if (_.isString(params.locationBaseUrl) && params.locationBaseUrl.length) {
        // Replace trailing backslashes. The parameter should be provided without them,
        // but we can fix this if the user makes a mistake
        var baseUrl = params.locationBaseUrl.replace(/\/+$/, '') + '/';

        baseUrlLocation = {
          flash: baseUrl + BITDASH_FILES.FLASH,
          vr: baseUrl + BITDASH_FILES.VR,
          ui: baseUrl + BITDASH_FILES.UI,
          ui_css: baseUrl + BITDASH_FILES.UI_CSS
        };
      }

      if (!_.isEmpty(params.location)) {
        explicitLocation = params.location;
      }
      // If both locationBaseUrl and location are specified, we override baseUrl
      // generated values with any values that were provided explicitly
      bmConfig.location = _.extend({}, baseUrlLocation, explicitLocation);

      var customConfig = _.clone(params);
      // Remove location and locationBaseUrl which have already been set above
      delete customConfig.location;
      delete customConfig.locationBaseUrl;
      // This will extend the plugin's default configuration with page-level settings.
      // The effect of the custom config values will be the responsibility of the
      // person passing them. Note that we avoid doing any validations in order to
      // allow forward compatibility.

      // From a customer perspective only a subset of the options will be documented
      // and supported. The effect of documented config options DOES need to be assessed
      // and validated by QA. The rest of the options are reserved for dev use.

      // Values are not deep-merged, which means that page-level settings will
      // override the plugin's config. For this and other reasons, config values
      // that are used by the plugin should never be customer-facing (i.e. added to the docs).
      _.extend(bmConfig, customConfig);

      // Avoid giving extra exposure to our Bitmovin key when logging the new
      // state of the config object
      var loggableConfig = _.clone(bmConfig);
      delete loggableConfig.key;
      OOV4.log('Bitmovin configuration:', loggableConfig);
    };

    var _createCustomSubtitleDisplay = function() {
      _ccWrapper = $("<div>");

      var wrapperStyle = {
        position:'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        pointerEvents: 'none'
      };
      _ccWrapper.css(wrapperStyle);

      var subtitleContainer = $('<div>');
      var subtitleList = $('<ol id="subtitles">');

      var subtitleContainerStyle = {
        textAlign: 'center',
        left: '5%',
        top: '5%',
        width: '90%',
        height: '90%',
        fontFamily: 'verdana',
        textShadow: 'black 1px 1px 1px, black 1px -1px 1px, black -1px 1px 1px, black -1px -1px 1px',
        color: 'white',
        position: 'absolute',
        fontSize: '25px',
        lineHeight: '25px',
        margin: 0,
        padding: 0
      };
      subtitleContainer.css(subtitleContainerStyle);

      var subtitleListStyle = {
        bottom: '30px',
        listStyle: 'none',
        position: 'absolute',
        margin: '0px 0px 10px',
        padding: 0,
        width: '100%'
      };
      subtitleList.css(subtitleListStyle);

      subtitleContainer.append(subtitleList);
      _ccWrapper.append(subtitleContainer);
      $(_videoWrapper).append(_ccWrapper);
    };

    _videoElement = $("<video>");
    _videoElement.attr("class", "video");
    _createCustomSubtitleDisplay();
    _applyPluginParams(conf, pluginParams);

    this.player = bitmovinPlayer(domId);
    this.player.setAuthentication(videoController.authenticationData);
    this.player.setVideoElement(_videoElement[0]);

    /**
     * Set DRM data
     * @public
     * @method BitdashVideoWrapper#setDRM
     * @param {object} drm DRM data object contains widevine, playready and fairplay as keys and object as value that includes
     * la_url {string} (optional for playready), and certificate_url {string} (for fairplay only).
     * (ex. {"widevine": {"la_url":"https://..."},"playready": {}, "fairplay": {"la_url":"https://...", "certificate_url":"https://..."}}})
     * More details: https://wiki.corp.ooyala.com/display/ENG/Design+of+DRM+Support+for+Playback+V4+-+HTML5+Player
     */
    this.setDRM = function(drm) {
      if (!drm || _.isEmpty(drm)) return;

      var MAX_NUM_OF_RETRY = 2;
      var RETRY_DELAY_MILLISEC = 1000;
      var auth_token = null;

      if (OOV4.localStorage) {
        var oo_auth_token = OOV4.localStorage.getItem("oo_auth_token");
        if(oo_auth_token && !_.isEmpty(oo_auth_token)) {
          auth_token = oo_auth_token;
        }
      }

      if (drm.widevine) {
        _setWidevineDRM(drm.widevine, MAX_NUM_OF_RETRY, RETRY_DELAY_MILLISEC);
      }

      if (drm.playready) {
        _setPlayreadyDRM(drm.playready, auth_token, MAX_NUM_OF_RETRY, RETRY_DELAY_MILLISEC);
      }

      if (drm.fairplay) {
        _setFairplayDRM(drm.fairplay, auth_token);
      }
    };

    /************************************************************************************/
    // Required. Methods that Video Controller, Destroy, or Factory call
    /************************************************************************************/

    /**
     * Sets the preferred technology to be used for playback of DASH and HLS assets
     * @public
     * @method BitdashVideoWrapper#setPlatform
     * @param {string} technology Technology to be used for playback of DASH and HLS assets (BITDASH_TECHNOLOGY.FLASH, or BITDASH_TECHNOLOGY.HTML5)
     * @param {string} encoding The encoding of video stream, possible values are found in OOV4.VIDEO.ENCODING
     */
    this.setPlatform = function(technology, encoding) {
      technology = technology ? technology : DEFAULT_TECHNOLOGY;
      var secondaryTech = null;

      if (technology === BITDASH_TECHNOLOGY.HTML5) {
          secondaryTech = BITDASH_TECHNOLOGY.FLASH;
      } else if (technology === BITDASH_TECHNOLOGY.FLASH) {
          secondaryTech = BITDASH_TECHNOLOGY.HTML5;
      }

      //If we don't have flash or if we are playing a DRM content (DRM requires HTML5 or native)
      //we'll need to force HTML5 technology with no secondary tech
      if (!hasFlash() || _isDRMEncoding(encoding)) {
        technology = BITDASH_TECHNOLOGY.HTML5;
        secondaryTech = null;
      }

      //Supported values for bitmovin v6 preferred tech
      //found at: https://bitmovin.com/player-documentation/player-configuration-v6/
      /*
       { player: 'html5', streaming: 'dash'}
       { player: 'html5', streaming: 'hls'}
       { player: 'native', streaming: 'hls'}
       { player: 'flash', streaming: 'dash'}
       { player: 'flash', streaming: 'hls'}
       { player: 'native', streaming: 'progressive'}
       */

      conf.playback.preferredTech = [];

      //Prioritize native progressive if encoding is mp4
      if (encoding === OOV4.VIDEO.ENCODING.MP4) {
        conf.playback.preferredTech.push({ player: BITDASH_TECHNOLOGY.NATIVE, streaming: BITDASH_STREAMING.PROGRESSIVE});
      }

      var playerOrder = [technology];
      if (secondaryTech) {
        playerOrder.push(secondaryTech);
      }
      var streamingOrder = [];

      //if hls has priority
      if (encoding === OOV4.VIDEO.ENCODING.HLS || encoding === OOV4.VIDEO.ENCODING.AKAMAI_HD2_VOD_HLS ||
        encoding === OOV4.VIDEO.ENCODING.AKAMAI_HD2_HLS || encoding === OOV4.VIDEO.ENCODING.DRM.HLS) {
        streamingOrder.push(BITDASH_STREAMING.HLS, BITDASH_STREAMING.DASH);
      } else {
        //else dash has priority
        streamingOrder.push(BITDASH_STREAMING.DASH, BITDASH_STREAMING.HLS);
      }

      for(var i = 0; i < playerOrder.length; i++) {
        for(var j = 0; j < streamingOrder.length; j++) {
          //We want to prioritize native HLS for preferred tech over html5 HLS
          if (playerOrder[i] === BITDASH_TECHNOLOGY.HTML5 && streamingOrder[j] === OOV4.VIDEO.ENCODING.HLS) {
            conf.playback.preferredTech.push({ player: BITDASH_TECHNOLOGY.NATIVE, streaming: BITDASH_STREAMING.HLS});
          }
          conf.playback.preferredTech.push({
            player: playerOrder[i],
            streaming: streamingOrder[j]
          });
        }
      }

      if (encoding !== OOV4.VIDEO.ENCODING.MP4) {
        conf.playback.preferredTech.push({ player: BITDASH_TECHNOLOGY.NATIVE, streaming: BITDASH_STREAMING.PROGRESSIVE});
      }
 
      //because android does not support native.hls you need to use html5.hls.
      // Details: https://github.com/bitmovin/ooyala-sync/issues/130
      if (OOV4.isAndroid && (!!(conf && conf.source && conf.source.vr) || 
          this.allowAndroidHls)) {
        conf.playback.preferredTech.forEach(function (value) {
          if (value.player === BITDASH_TECHNOLOGY.NATIVE && value.streaming === BITDASH_STREAMING.HLS){
            value.player = BITDASH_TECHNOLOGY.HTML5;
          }
        });
      }
    };

    /**
     * Setting parameters for bitmovin player
     * @public
     * @method BitdashVideoWrapper#setupBitmovinPlayer
     * @param {object} source - object containing url and vr parameters
     */
    this.setupBitmovinPlayer = function (source) {
      if (!_playerSetup) {
        if (conf.source && conf.source.vr) {
          conf.source = source;
          var startPosition = source.vr.startPosition;
          this.startVrViewingDirection.yaw = startPosition;
          this.getCurrentDirection({yaw: startPosition});
        }
        //TODO: [Player-398] conf.playback.preferredTech needs to be filled out
        //before we call player.setup. Find out if there is a better place to move this (and setPlatform).
        //player.setup is only handled by Bitmovin on the first call, so we can't change the config after the fact.
        //Future calls will throw a warning

        _playerSetupPromise = this.player.setup(conf);
        var _this = this;
        _playerSetupPromise.then(function(player) {
          if (!window.runningUnitTests) {
            OOV4.log('%cBitmovin player version ' + player.version + ' has been set up', 'color: blue; font-weight: bold');
          }
          _this.disableVrKeyboardControls();
        }, function(error) {
          if (!window.runningUnitTests) {
            OOV4.log('%cError setting up Bitmovin player ' + error, 'color: red; font-weight: bold');
          }
        });
        _playerSetup = true;
      }
    };

    /**
     * Sets the url of the video.
     * @public
     * @method BitdashVideoWrapper#setVideoUrl
     * @param {string} url The new url to insert into the video element's src attribute
     * @param {string} encoding The encoding of video stream, possible values are found in OOV4.VIDEO.ENCODING
     * @param {boolean} isLive True if it is a live asset, false otherwise (unused here)
     * @returns {boolean} True or false indicating success
     */
    this.setVideoUrl = function(url, encoding, isLive) {
      var vrContent = !!(conf && conf.source && conf.source.vr);
      // AMC clears the ad video source with empty values after an ad plays.
      // The empty url can be handled, but Bitmovin will throw an error if no encoding is set.
      if (url === '' && !encoding) {
        encoding = OOV4.VIDEO.ENCODING.MP4;
      }

      if (_.isEmpty(conf.playback.preferredTech)) {
        // Just in case setPlatform wasn't called, mostly for unit tests, VTC always calls setPlatform before calling setVideoUrl
        this.setPlatform(null, encoding); // set default platform
      }

      var urlChanged = false;
      if (_currentUrl.replace(/[\?&]_=[^&]+$/,'') != url) {
        _currentUrl = url || "";
        urlChanged = true;
        resetStreamData();
      }

      _isM3u8 = _isDash = _isMP4 = _hasDRM = false;
      if (encoding == OOV4.VIDEO.ENCODING.HLS || encoding == OOV4.VIDEO.ENCODING.AKAMAI_HD2_VOD_HLS ||
        encoding == OOV4.VIDEO.ENCODING.AKAMAI_HD2_HLS) {
        _isM3u8 = true;
      } else if (encoding == OOV4.VIDEO.ENCODING.DASH) {
        _isDash = true;
      } else if (encoding == OOV4.VIDEO.ENCODING.MP4) {
        _isMP4 = true;
      } else if (encoding == OOV4.VIDEO.ENCODING.DRM.HLS) {
        _isM3u8 = true;
        _hasDRM = true;
      } else if (encoding == OOV4.VIDEO.ENCODING.DRM.DASH) {
        _isDash = true;
        _hasDRM = true;
      } else if (!_.isEmpty(encoding)) {
        this.controller.notify(this.controller.EVENTS.ERROR, { errorcode: 4 }); //4 -> MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
        return false;
      }

      if (_.isEmpty(url) || urlChanged) {
        // Force iOS (without vr360) and Android to preload the stream so that when we click play the stream player is ready.
        // If we do not preload, then the stream will require multiple clicks, one to trigger load, and one
        // to trigger play.
        //for vr on ios player does not correctly handle pressing on play and pause
        if ((OOV4.isIos && !vrContent) || OOV4.isAndroid) {
          this.controller.markNotReady();
          this.load();
        }
      }

      if (vrContent && _currentTime !== 0) {
        if (_videoEnded) {
          _currentTime = 0;
        }

        this.reCreatePlayer();
        this.load();
        this.seek(_currentTime);
      }

      return urlChanged;
    };

    /**
     * Recreate Bitmovin Player
     * @private
     * @method BitdashVideoWrapper#reCreatePlayer
     */
    this.reCreatePlayer = function () {
      _playerSetupPromise = null;
      _playerLoadPromise = null;
      _playerSetup = false;
      _loaded = false;
      _initialized = false;
      _hasPlayed = false;

      this.player && this.player.destroy();
      this.player = bitmovinPlayer(domId);
      this.player.setAuthentication(videoController.authenticationData);
      this.player.setVideoElement(_videoElement[0]);
    };

    /**
     * Callback to handle notifications that ad finished playing
     * @private
     * @method BitdashVideoWrapper#onAdsPlayed
     */
    this.onAdsPlayed = function() {
      _adsPlayed = true;
    };

    /**
     * Sets the closed captions on the video element.
     * @public
     * @method BitdashVideoWrapper#setClosedCaptions
     * @param {string} language The language of the closed captions. If null, the current closed captions will be removed.
     * @param {object} closedCaptions The closedCaptions object
     * @param {object} params The params to set with closed captions
     */
    this.setClosedCaptions = function(language, closedCaptions, params) {
      _currentClosedCaptionsData = closedCaptions;
      if (!language || (params && params.mode === OOV4.CONSTANTS.CLOSED_CAPTIONS.DISABLED)) {
        _trackId = null;
        _captionsDisabled = true;
        this.player.setSubtitle(null);
        return;
      }

      _captionsDisabled = false;
      var toShow = true;
      if (params && params.mode == OOV4.CONSTANTS.CLOSED_CAPTIONS.HIDDEN) {
        toShow = false;
      }

      // Get url and label of the CC's with the selected language
      var ccData = _extractClosedCaptionsData(closedCaptions, language);
      var availableTracks = this.player.getAvailableSubtitles() || [];

      // Find out whether existing tracks already contain the current track id or the url to be set
      var existingTrackWithIdOrUrl = _.find(availableTracks, function(track) {
        var existsId = track.id && track.id === _trackId;
        var existsUrl = track.url && track.url === ccData.url;

        return (existsId || existsUrl) && track.lang === language;
      });

      // Found an existing track with the same id or url (and language). We can simply enable that track
      if (existingTrackWithIdOrUrl) {
        _trackId = existingTrackWithIdOrUrl.id;
        _showCaptions(toShow);
        this.player.setSubtitle(_trackId);
        return;
      }

      // We haven't added a track for this language yet, but there might be an
      // in-manifest equivalent loaded already
      var existingTrackWithLang = _.find(availableTracks, function(track) {
        return track.lang === language;
      });

      // New track is required if no previous track with the same langauge exists or
      // if there's a previous track with the specified language but the VTC passed CC data
      // for this language. The latter scenario means that the existing track is in-manifest,
      // so we want to override it with the external CC's passed by the VTC.
      var isNewTrackRequired = !existingTrackWithLang || ccData.url;
      _trackId = isNewTrackRequired ? OOV4.getRandomString() : existingTrackWithLang.id;

      // Add new track if needed
      if (isNewTrackRequired) {
        this.player.addSubtitle({
          id: _trackId,
          url: ccData.url,
          kind: 'captions',
          lang: language,
          label: ccData.label
        });
      }
      // Enable selected captions
      _showCaptions(toShow);
      this.player.setSubtitle(_trackId);
    };

    /**
     * Helper function that extracts the url and label of the CC's with the specified language from
     * the content tree's closed captions object.
     * @private
     * @method BitdashVideoWrapper#_extractClosedCaptionsData
     * @param {Object} closedCaptions The closed captions object passed by the VTC.
     * @param {String} language The language code of the CC's we want to get data for.
     * @return {Object} An object with the url and label properties that correspond to the CC's with
     * the given language. Will return an empty object if no matching CC's are found. Gives priority
     * to VTT captions but falls back to DFXP when VTT are missing.
     */
    var _extractClosedCaptionsData = _.bind(function(closedCaptions, language) {
      var data = {};
      closedCaptions = closedCaptions || {};
      var closedCaptionsVtt = closedCaptions.closed_captions_vtt && closedCaptions.closed_captions_vtt[language];

      if (closedCaptionsVtt) {
        data.url = closedCaptionsVtt.url
        data.label = closedCaptionsVtt.name;
      } else if (
        closedCaptions.closed_captions_dfxp &&
        closedCaptions.closed_captions_dfxp.languages &&
        closedCaptions.closed_captions_dfxp.languages.length
      ) {
        var existsDfxpLanguage = _.some(closedCaptions.closed_captions_dfxp.languages, function(dfxpLang) {
          return dfxpLang === language;
        });
        // DFXP uses a single url for all languages, we just need to check that the
        // specified language is supported
        if (existsDfxpLanguage) {
          data.url = closedCaptions.closed_captions_dfxp.url;
          data.label = language + '_oo'; // Create unique label for dfxp captions since their data doesn't have one
        }
      }
      // Create default label if missing
      if (!data.label) {
        data.label = this.player && this.player.isLive() ? language + ' live' : language;
      }
      return data;
    }, this);

    /**
     * Searches for a label for a particular language inside the most recent closed
     * captions data passed by the VTC.
     * @private
     * @method BitdashVideoWrapper#_getCCLanguageLabel
     * @param {string} language The language code to match.
     * @param {string} defaultLabel A default value to return in case a matching label is not found.
     * @return {string} The label that matches specified language code or the value of defaultLabel if none is found.
     */
    var _getCCLanguageLabel = function(language, defaultLabel) {
      var ccData = _currentClosedCaptionsData || {};
      var closedCaptionsVtt = ccData.closed_captions_vtt && ccData.closed_captions_vtt[language];
      var label = (closedCaptionsVtt || {}).name || defaultLabel;
      return label;
    };

    /**
     * Sets the closed captions mode on the video element.
     * @public
     * @method BitdashVideoWrapper#setClosedCaptionsMode
     * @param {string} mode The mode to set the text tracks element. One of
     * (OOV4.CONSTANTS.CLOSED_CAPTIONS.DISABLED, OOV4.CONSTANTS.CLOSED_CAPTIONS.HIDDEN, OOV4.CONSTANTS.CLOSED_CAPTIONS.SHOWING).
     */
    this.setClosedCaptionsMode = function(mode) {
      switch (mode) {
        case OOV4.CONSTANTS.CLOSED_CAPTIONS.DISABLED:
          _trackId = null;
          _captionsDisabled = true;
          this.player.setSubtitle(null);
          break;
        case OOV4.CONSTANTS.CLOSED_CAPTIONS.SHOWING:
          _captionsDisabled = false;
          _showCaptions(true);
          break;
        case OOV4.CONSTANTS.CLOSED_CAPTIONS.HIDDEN:
          _captionsDisabled = false;
          _showCaptions(false);
      }
    };

    /**
     * Sets the crossorigin attribute on the video element.
     * @public
     * @method BitdashVideoWrapper#setCrossorigin
     * @param {string} crossorigin The value to set the crossorigin attribute. Will remove crossorigin attribute if null.
     */
    this.setCrossorigin = function(crossorigin) {
      if (crossorigin) {
        $(_videoElement).attr("crossorigin", crossorigin);
      } else {
        $(_videoElement).removeAttr("crossorigin");
      }
    };

    /**
     * Sets the stream to play back based on given bitrate object. Plugin must support the
     * BITRATE_CONTROL feature to have this method called.
     * @public
     * @method BitdashVideoWrapper#setBitrate
     * @param {string} bitrateId representing bitrate, list with valid IDs was retrieved by player.calling getAvailableVideoQualities(),
     * "auto" resets to dynamic switching.
     *
     *   Example: "240p 250kbps", "480p 800kbps", "auto"
     */
    this.setBitrate = function(bitrateId) {
      this.player.setVideoQuality(bitrateId);
    };

    /**
     * Loads the current stream url in the video element; the element should be left paused.
     * @public
     * @method BitdashVideoWrapper#load
     * @param {boolean} rewind True if the stream should be set to time 0
     */
    this.load = function(rewind) {
      if (_loaded && !rewind) {
        return;
      }
      if (typeof _currentUrl != "string") {
        return;
      }

      if (!_initialized) {
        _initPlayer();
      }

      if (!_loaded) {
        var source = _.extend({}, conf.source);
        //PLAYER-2020 On Android, on replay, we are sometimes getting multiple stream formats set. One for the ad and one for main content.
        //BM doesn't seem to like this and plays the wrong stream for the ad. So we need to clear the old entries but we don't want to lose
        //and other data that that may be stored in 'source'.
        delete source.hls;
        delete source.dash;
        delete source.progressive;
        delete source.drm;
        if (_isDash) {
          source.dash = _currentUrl;
        } else if (_isM3u8) {
          source.hls = _currentUrl;
        } else if (_isMP4) {
          source.progressive = [{ url:_currentUrl, type:'video/mp4' }];
        } else {
          // Just in case, we shouldn't get here
          this.controller.notify(this.controller.EVENTS.ERROR, { errorcode: 4 }); //4 -> MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED
          console.warn("Unsupported encoding, can't load player");
          return;
        }

        if (_hasDRM) {
          // If the stream has DRM protected, the _drm data is required
          if (_.isEmpty(_drm)) {
            this.controller.notify(this.controller.EVENTS.ERROR, { errorcode: 3 });
            console.warn("Missing DRM data");
            return;
          }
          source.drm = _drm;
        }

        //If the player was not created at the moment of calling the "load" method, then it must be created
        if (!_playerSetupPromise || !_playerSetupPromise.then) {
          this.setupBitmovinPlayer(source);
        }

        // Note that _currentUrl could've been replaced by the time the async operations below are completed.
        // We store this in a local variable so that current value is preserved by closure.
        var urlToBeLoaded = _currentUrl;
        // [PLAYER-1249]
        // We need to allow the player setup call to finish before loading a source
        _playerSetupPromise
        .then(_.bind(function() {
          // [PLAYER-2072]
          // Postrolls + Discovery + Single Element trigger a race condition which sometimes
          // results in player.load() getting called while the loading of another url is still
          // in progress, causing an exception. This happens because the main source is restored
          // briefly after the postroll and then the core tries to load the source of the next Discovery
          // video soon after. This workaround prevents player.load() from being called while another
          // player.load() call is in progress, but note that it can only handle two calls in a row.
          if (!_playerLoadPromise) {
            // If no other call to player.load() is in progress we just return a resolved promise
            // and continue with the flow.
            // IMPORTANT
            // Promise API requires a polyfill on IE11. We're currently leveraging Bitmovin's
            // polyfill which is included with their player script.
            _playerLoadPromise = Promise.resolve();
          }
          return _playerLoadPromise;
        }, this))
        .then(_.bind(function() {
          _playerLoadPromise = this.player.load(source);
          _loadSourceRequested = true;
          // We currently use an empty source when priming ad video elements
          // but Bitmovin never resolves the load promise when an empty url is
          // used. If the source is an empty url, we use a resolved promise
          // as a workaround in order to not disrupt the flow.
          if (urlToBeLoaded === '') {
            _playerLoadPromise = Promise.resolve();
          }
          return _playerLoadPromise;
        }, this))
        .then(_.bind(function(player) {
          if (player) {
            // PLAYER-1323
            // We do not preload if play has already been called since it's redundant and it
            // also triggers a Bitmovin issue that causes playback to freeze when playing mp4's.
            if (!_hasPlayed) {
              player.preload();
              OOV4.log("Bitmovin: Preloading ENABLED.");
            }

            if (window.runningUnitTests) {
              return;
            }

            var playerFigure = $(_videoWrapper).find("figure");
            _ccWrapper.detach().appendTo(playerFigure);
            this.disableVrKeyboardControls();
            _printPlayerLoadInfo(player, urlToBeLoaded);
          }
        }, this))
        .catch(function(error) {
          OOV4.log('%cError loading source URL ' + urlToBeLoaded + ' ' + error, 'color: red; font-weight: bold');
        });
        _loaded = true;
        conf.source = source;
      }

      if (!!rewind && this.player.isReady()) {
        _currentTime = 0;
        if (!_videoEnded) {
          this.pause();
        }
      }
    };

    /**
     * Called after a source is loaded in order to output the current stream's
     * information to the browser console.
     * @private
     * @method BitdashVideoWrapper#_printPlayerLoadInfo
     * @param {Object} player The Bitmovin player instance.
     * @param {Object} currentUrl The url that was loaded.
     */
    var _printPlayerLoadInfo = function(player, currentUrl) {
      if (!player) {
        return;
      }
      var technology = player.getPlayerType() + '.' + player.getStreamType();
      var drmInfo = 'none';
      if (_hasDRM) {
        drmInfo = JSON.stringify(_.keys(_drm));
      }
      var infoText = '%cBitmovin player is using technology: ' + technology + ', manifest: ' + currentUrl + ', DRM: ' + drmInfo;
      OOV4.log(infoText, 'color: green; font-weight: bold');
    };

    /**
     * Sets the initial time of the video playback.
     * @public
     * @method BitdashVideoWrapper#setInitialTime
     * @param {number} initialTime The initial time of the video (seconds)
     */
    this.setInitialTime = function(initialTime) {
      if ((!_hasPlayed || _videoEnded) && initialTime > 0) {
        this.seek(initialTime);
      }
    };

    /**
     * Triggers playback on the video element.
     * @public
     * @method BitdashVideoWrapper#play
     */
    this.play = function() {
      this.setVrViewingDirection(this.vrViewingDirection);
      playVideo(false);
    };

    /**
     * Triggers a pause on the video element.
     * @public
     * @method BitdashVideoWrapper#pause
     */
    this.pause = function() {
      this.player.pause();
      // If pause command comes while seeking, make sure to re-instante the pause upon seeked
      _shouldPause = _isSeeking;
    };

    /**
     * Triggers a seek on the video element.
     * @public
     * @method BitdashVideoWrapper#seek
     * @param {number} time The time to seek the video to (in seconds)
     */
    this.seek = function(time) {
      _seekTime = null;
      if (typeof time !== "number") {
        return;
      }

      if (!_hasPlayed || _videoEnded) {
        _seekTime = time;
        _initialTimeToReach = time;
      } else {
        var duration = this.player.getDuration();
        if (duration > 0) {
          var safeTime = convertToSafeSeekTime(time, duration);

          if (this.player.isLive()) {
            this.player.timeShift(this.player.getMaxTimeShift() + safeTime);
          } else {
            this.player.seek(safeTime);
          }
          _currentTime = safeTime;
        }
      }
    };

    /**
     * Call moveViewingDirection method from bitmovin api
     * @public
     * @param {number} x - horizontal displacement
     * @param {number} y - vertical displacement
     * @param {number} phi - angle of rotation
     * @method BitdashVideoWrapper#moveVrViewingDirection
     * @returns {boolean} - the result of the function. True if the moveViewingDirection method is called in bitmovin
     */
    this.moveVrViewingDirection = function( x, y, phi ) {
      return this.player && this.player.vr && this.player.vr.moveViewingDirection({ x: x, y: y, phi: parseInt(phi) });
    };

    /**
     * Call setViewingDirection method from bitmovin api and set this.vrViewingDirection
     * @public
     * @param params {object} {{yaw: number, roll: number, pitch: number}}
     * yaw - rotation around the vertical axis
     * roll - rotation around the front-to-back axis
     * pitch - rotation around the side-to-side axis
     * @method BitdashVideoWrapper#setVrViewingDirection
     * @returns {boolean} - true if the setViewingDirection method is called in bitmovin
     */
    this.setVrViewingDirection = function(params) {
      if (params !== null && typeof params === 'object') {
        params = _setViewBoundaries(params);

        var yaw = (params.yaw && _.isNumber(params.yaw)) ? params.yaw : this.startVrViewingDirection.yaw;
        var roll = (params.roll && _.isNumber(params.roll)) ? params.roll : this.startVrViewingDirection.roll;
        var pitch = (params.pitch && _.isNumber(params.pitch)) ? params.pitch : this.startVrViewingDirection.pitch;
        this.vrViewingDirection = {yaw: yaw, roll: roll, pitch: pitch};

        if (this.player && this.player.vr && typeof this.player.vr.setViewingDirection === 'function') {
          return this.player.vr.setViewingDirection(this.vrViewingDirection);
        }
      }
      return false;
    };

    /**
     * Call getViewingDirection method from bitmovin api
     * @public
     * @method BitdashVideoWrapper#getVrViewingDirection
     * @returns {object} current viewing direction
     */
    this.getVrViewingDirection = function() {
      return this.player && this.player.vr && this.player.vr.getViewingDirection();
    };

    /**
     * @public
     * @method BitdashVideoWrapper#getIsVideoMoving
     * @returns {boolean} If video is currently moving
     */
    this.getIsVideoMoving = function() {
      return this.isVideoMoving;
    };

    /**
     * Call enableMouseControl method from bitmovin api
     * @public
     * @method BitdashVideoWrapper#enableVrMouseControls
     * @returns {boolean}
     */
    this.enableVrMouseControls = function() {
      if (this.player && this.player.vr) {
        return this.player.vr.enableMouseControl();
      }
      return false;
    };

    /**
     * Call disableMouseControl method from bitmovin api
     * @public
     * @method BitdashVideoWrapper#disableVrMouseControls
     * @returns {boolean}
     */
    this.disableVrMouseControls = function() {
      if (this.player && this.player.vr) {
        return this.player.vr.disableMouseControl();
      }
      return false;
    };

    /**
     * Call setViewingDirectionChangeThreshold method from bitmovin api
     * @public
     * @param {number} threshold - number of degrees that the viewport can change before the
     * ON_VR_VIEWING_DIRECTION_CHANGE event is triggered {number}
     * @method BitdashVideoWrapper#setVrViewingDirectionChangeThreshold
     * @returns {boolean} - true if the setViewingDirectionChangeThreshold method is called in bitmovin
     */
    this.setVrViewingDirectionChangeThreshold = function(threshold) {
      if (this.player && this.player.vr) {
        return this.player.vr.setViewingDirectionChangeThreshold(threshold);
      }
      return false;
    };

    /**
     * Call setVRViewingDirectionChangingEventInterval method from bitmovin api
     * @public
     * @param {number} interval - minimal interval between consecutive ON_VR_VIEWING_DIRECTION_CHANGE events
     * @method BitdashVideoWrapper#setVrViewingDirectionChangingEventInterval
     * @returns {boolean} - true if the setViewingDirectionChangeEventInterval method is called in bitmovin
     */
    this.setVrViewingDirectionChangingEventInterval = function (interval) {
      if (this.player && this.player.vr) {
        return this.player.vr.setViewingDirectionChangeEventInterval(interval);
      }
      return false;
    };

    /**
     * Getting the current direction
     * @public
     * @method BitdashVideoWrapper#getCurrentDirection
     * @returns {object} local viewing direction
     */
    this.getCurrentDirection = function() {
      return this.vrViewingDirection;
    };

    /**
     * Call enableKeyboardControls method from bitmovin api
     * @public
     * @method BitdashVideoWrapper#enableVrKeyboardControls
     * returns {boolean}
     */
    this.enableVrKeyboardControls = function() {
      if (this.player && this.player.vr) {
        return this.player.vr.enableKeyboardControl();
      }
      return false;
    };

    /**
     * Call disableKeyboardControl method from bitmovin api
     * @public
     * @method BitdashVideoWrapper#disableVrKeyboardControls
     * @returns {boolean}
     */
    this.disableVrKeyboardControls = function() {
      if (this.player && this.player.vr) {
        return this.player.vr.disableKeyboardControl();
      }
      return false;
    };

    /**
     * Call getViewingDirectionChangeEventInterval method from bitmovin api
     * @public
     * @method BitdashVideoWrapper#getVrViewingDirectionChangingEventInterval
     * @returns {number} - The minimal interval between consecutive ON_VR_VIEWING_DIRECTION_CHANGE events.
     * If the method is unavailable, returns -1
     */
    this.getVrViewingDirectionChangingEventInterval = function () {
      var interval = -1; //the default value that is impossible when calling the getViewingDirectionChangeEventInterval method
      if (this.player &&
        this.player.vr &&
        typeof this.player.vr.getViewingDirectionChangeEventInterval === "function") {
        interval = this.player.vr.getViewingDirectionChangeEventInterval();
      }
      return interval;
    };

    /**
     * Call isKeyboardControlEnabled method from bitmovin api
     * @public
     * @method BitdashVideoWrapper#isVrKeyboardControlEnabled
     * @returns {boolean}
     */
    this.isVrKeyboardControlEnabled = function() {
      if (this.player && this.player.vr) {
        return this.player.vr.isKeyboardControlEnabled();
      }
      return false;
    };

    /**
     * Triggers a mute on the video element.
     * @public
     * @method BitdashVideoWrapper#mute
     */
    this.mute = function() {
      if (!canChangeVolume()) {
        _setMute = true;
      }
      this.player.mute();
    };

    /**
     * Triggers an unmute on the video element.
     * @public
     * @method BitdashVideoWrapper#unmute
     */
    this.unmute = function() {
      if (!canChangeVolume()) {
        _setMute = false;
      }
      this.player.unmute();
    };

    /**
     * Triggers a volume change on the video element.
     * @public
     * @method BitdashVideoWrapper#setVolume
     * @param {number} volume A number between 0 and 1 indicating the desired volume percentage
     */
    this.setVolume = function(volume) {
      var resolvedVolume = volume;
      if (resolvedVolume < 0) {
        resolvedVolume = 0;
      } else if (resolvedVolume > 1) {
        resolvedVolume = 1;
      }

      //[PLAYER-678] Workaround of an issue where player.isReady is returning true but _onReady
      //has not been called yet. If the player is not playing and not paused, we'll save the volume
      //as well
      if (!canChangeVolume()) {
        _setVolume = resolvedVolume;
      }

      this.player.setVolume(resolvedVolume * 100);
    };

    /**
     * Call setStereo method from bitmovin api
     * @public
     * @method BitdashVideoWrapper#toggleStereoVr
     * @returns {boolean} - true if the setStereo method is called in bitmovin
     */
    this.toggleStereoVr = function () {
      //checking for the existence of properties and methods
      var checkVrStereoParams = this.player &&
        this.player.vr &&
        typeof this.player.vr.setStereo === "function" &&
        typeof this.player.vr.getStereo === "function";

      if (checkVrStereoParams) {
        this.player.vr.setStereo(!this.player.vr.getStereo());
      }

      return checkVrStereoParams;
    };

    /**
     * The method forms an array with input parameters for calling moveViewingDirection from bitmovin api.
     * @param {string} direction - "camera" offset direction. Correct values: "left", "right", "up", "down".
     * @returns {Array}  - an array with camera bias parameters [dx, dy, phi].
     * If the values are incorrect, then return an empty list
     * @private
     * @method BitdashVideoWrapper#_getArrayDirections
     */
    this._getArrayDirections = function(direction) {
      var dx = _stepDirection.dx,
        dy = _stepDirection.dy,
        arrDirection = [];

      switch (direction) {
        case 'right':
          arrDirection = [-dx,0,0];
          break;
        case 'left':
          arrDirection = [dx,0,0];
          break;
        case 'up':
          arrDirection = [0,dy,0];
          break;
        case 'down':
          arrDirection = [0,-dy,0];
          break;
      }

      return arrDirection;
    };

    /**
     * moveVrToDirection controls the rotation.
     * @param isRotating : {boolean} This parameter indicates whether the rotation has started or stopped.
     * Can take a value of true (rotating) or false (not rotating)
     * @param direction : {string} This parameter shows the direction of rotation (the "camera" offset).
     * It can take the values "left", "right", "up", "down", "init".
     * @public
     * @method BitdashVideoWrapper#moveVrToDirection
     * @return {boolean} - false if the arguments are not correct In all other cases, returns true
     */
    this.moveVrToDirection = function (isRotating, direction) {

      if(direction === 'init') {
        if (isRotating) {
          this.setVrViewingDirection({});
          return true;
        }
      }


      var self = this;
      var arrDirection = this._getArrayDirections(direction);

      //validation of values
      if (arrDirection.length !== 3 || typeof isRotating != 'boolean') {
        return false;
      }

      var rotate = function() {
        self.isVideoMoving = true;
        self.moveVrViewingDirection.apply(self, arrDirection);
        _requestAnimationId = requestAnimationFrame(rotate);
        return _requestAnimationId;
      };

      var cancelRotate = function () {
        _requestAnimationId && cancelAnimationFrame(_requestAnimationId);
        self.setBitrate("auto");
        return _requestAnimationId;
      };

      if (isRotating) {
        rotate();
      } else {
        cancelRotate();
      }

      return true;
    };

    /**
     * Checks to see if the Bitmovin player is ready to change volume.
     * @private
     * @method BitdashVideoWrapper#canChangeVolume
     */
    var canChangeVolume = _.bind(function() {
      return this.player.isReady() && (this.player.isPlaying() || this.player.isPaused());
    }, this);

    /**
     * Gets the current time position of the video.
     * @public
     * @method BitdashVideoWrapper#getCurrentTime
     * @returns {number} The current time position of the video (seconds)
     */
    this.getCurrentTime = function() {
      return _currentTime;
    };

    /**
     * Prepares a video element to be played via API.  This is called on a user click event, and is used in
     * preparing HTML5-based video elements on devices.  To prepare the element for playback, call pause and
     * play.  Do not raise playback events during this time.
     * @public
     * @method BitdashVideoWrapper#primeVideoElement
     */
    this.primeVideoElement = function() {
      // Prime iOS and Android videos with a play on a click so that we can control them via JS later
      // TODO: This is only required on HTML5-based video elements.
      playVideo(true);
      this.pause();
    };

    /**
     * Applies the given css to the video element.
     * @public
     * @method BitdashVideoWrapper#applyCss
     * @param {object} css The css to apply in key value pairs
     */
    this.applyCss = function(css) {
      $(_videoWrapper).css(css);
    };

    /**
     * Removes video wrapper element and destroys the player
     * @public
     * @method BitdashVideoWrapper#destroy
     */
    this.destroy = function() {
      this.pause();
      _currentUrl = '';
      _initialized = false;
      _loaded = false;
      _playerSetup = false;
      _loadSourceRequested = false;
      $(_videoWrapper).remove();
      this.player.destroy();
    };


    /**************************************************/
    // Helpers
    /**************************************************/

    var resetStreamData = _.bind(function() {
      _hasPlayed = false;
      _loaded = false;
      _videoEnded = false;
      _isSeeking = false;
      _currentTime = 0;
      _trackId = '';
      _willPlay = false;
      _priming = false;
      _seekTime = null;
      _shouldPause = false;
      _initialTimeToReach = 0;
      _setVolume = -1;
      _setMute = false;
      _vtcBitrates = {};
      _currentBitRate = '';
      _loadSourceRequested = false;
      _currentClosedCaptionsData = null;
    }, this);

    var _initPlayer = _.bind(function() {
      if (_initialized) {
        return;
      }

      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_AUDIO_ADAPTATION, _onAudioAdaptation);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_AUDIO_CHANGED, _onAudioChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_AUDIO_DOWNLOAD_QUALITY_CHANGED, _onAudioDownloadQualityChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_AUDIO_PLAYBACK_QUALITY_CHANGED, _onAudioPlaybackQualityChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_CUE_ENTER, _onCueEnter);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_CUE_EXIT, _onCueExit);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_DOWNLOAD_FINISHED, _onDownloadFinished);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_DVR_WINDOW_EXCEEDED, _onDVRWindowExceeded);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_ERROR, _onError);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_FULLSCREEN_ENTER, _onFullscreenEnter);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_FULLSCREEN_EXIT, _onFullscreenExit);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_METADATA, _onMetadata);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_MUTED, _onMuted);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_PAUSED, _onPaused);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_PERIOD_SWITCHED, _onPeriodSwitched);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_PLAY, _onPlay);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_PLAYING, _onPlaying);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_PLAYBACK_FINISHED, _onPlaybackFinished);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_PLAYER_RESIZE, _onPlayerResize);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_READY, _onReady);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_SEEK, _onSeek);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_SEEKED, _onSeeked);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_SEGMENT_REQUEST_FINISHED, _onSegmentRequestFinished);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_SOURCE_LOADED, _onSourceLoaded);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_SOURCE_UNLOADED, _onSourceUnloaded);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_STALL_STARTED, _onStallStarted);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_STALL_ENDED, _onStallEnded);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_SUBTITLE_ADDED, _onSubtitleAdded);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_SUBTITLE_CHANGED, _onSubtitleChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_SUBTITLE_REMOVED, _onSubtitleRemoved);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_TIME_CHANGED, _onTimeChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_TIME_SHIFT, _onTimeShift);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_TIME_SHIFTED, _onTimeShifted);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_UNMUTED, _onUnmuted);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_VIDEO_ADAPTATION, _onVideoAdaptation);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_VIDEO_DOWNLOAD_QUALITY_CHANGED, _onVideoDownloadQualityChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_VIDEO_PLAYBACK_QUALITY_CHANGED, _onVideoPlaybackQualityChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_VOLUME_CHANGED, _onVolumeChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_VR_ERROR, _onVRError);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_VR_MODE_CHANGED, _onVrModeChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_VR_STEREO_CHANGED, _onVrStereoChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_VR_VIEWING_DIRECTION_CHANGE, _onVrViewingDirectionChanging);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_VR_VIEWING_DIRECTION_CHANGED, _onVrViewingDirectionChanged);
      this.player.addEventHandler(bitmovinPlayer.EVENT.ON_WARNING, _onWarning);

      _initialized = true;
    }, this);

    var _isHLS = function(encoding){
      return (encoding === OOV4.VIDEO.ENCODING.HLS || 
              encoding === OOV4.VIDEO.ENCODING.AKAMAI_HD2_VOD_HLS ||
              encoding === OOV4.VIDEO.ENCODING.AKAMAI_HD2_HLS);
    }

    var _getSubtitleText = function(subtitleList) {
      var text = '';
      subtitleList.children().each(function() {
        text += $(this).text() + '\n';
      });
      return $.trim(text);
    };

    /**
     * Shows / hides element used to display closed captions / subtitles
     * @private
     * @param {boolean} toShow true to show captions, false to hide captions
     */
    var _showCaptions = function(toShow) {
      if (!_ccWrapper) {
        return;
      }
      var subtitleList = _ccWrapper.find("ol").attr("id", "subtitles");
      if (!subtitleList || (subtitleList.length == 0)) {
        return;
      }
      _ccVisible = toShow;
      if (window.runningUnitTests) {
        //in test environment call of show doesn't set css('display') property to 'block', so we explicitly set these properties here
        toShow ? subtitleList.css('display', OOV4.CSS.VISIBLE_DISPLAY) : subtitleList.css('display', OOV4.CSS.INVISIBLE_DISPLAY);
      } else {
        //in real environment call of css('display', 'block') doesn't show subtitleList element (<ol>), so we are explicitly calling show
        toShow ? subtitleList.show() : subtitleList.hide();
      }
    };

    /**
    * Set DRM data for Widevine Modular DRM
    * @private
    * @param {object} drm The object contains la_url {string}
    * @param {number} reqRetryNum Number of retries for license request
    * @param {number} retryDelayMillisec Milliseconds delay between retires
    */
    var _setWidevineDRM = function(drm, reqRetryNum, retryDelayMillisec) {
      var url = drm.la_url;
      if (url && !_.isEmpty(url)) {
        _drm["widevine"] = {
          LA_URL: url,
          maxLicenseRequestRetries: reqRetryNum,
          licenseRequestRetryDelay: retryDelayMillisec,
          // [PLAYER-1673] Reactivate the persistentState for device registration Widevine DRM.
          // This setting will block widevine assets to play in incognito mode.
          mediaKeySystemConfig: { persistentState: 'required' }
        };
      }
    };

    /**
    * Set DRM data for Playready DRM
    * @private
    * @param {object} drm The object contains la_url {string} (optional)
    * @param {string} authToken The string for authentication in SAS
    * @param {number} reqRetryNum Number of retries for license request
    * @param {number} retryDelayMillisec Milliseconds delay between retires
    */
    var _setPlayreadyDRM = function(drm, authToken, reqRetryNum, retryDelayMillisec) {
      _drm["playready"] = {
        maxLicenseRequestRetries: reqRetryNum,
        licenseRequestRetryDelay: retryDelayMillisec
      };
      if(authToken && !_.isEmpty(authToken)) {
        _drm.playready["headers"] = [{name:'ooyala-auth-token', value: authToken}];
      }
      var url = drm.la_url;
      if (url && !_.isEmpty(url)) {
        _drm.playready["LA_URL"] = url;
      }
    };

    /**
    * Set DRM data for Fairplay DRM
    * @private
    * @param {object} drm The object contains la_url {string} and certificate_url {string}
    * @param {string} authToken The token from SAS for authentication
    */
    var _setFairplayDRM = function(drm, authToken) {
      var url = drm.la_url;
      var cert = drm.certificate_url;
      if (!_.isEmpty(url) && !_.isEmpty(cert)) {
        _drm["fairplay"] = {
          LA_URL: url,
          certificateURL: cert,
          prepareMessage: function(event, session) {
            var spc = event.messageBase64Encoded;
            if (_.isEmpty(spc)) {
              OOV4.log("Fairplay: Missing SPC");
              return "";
            }
            var body = {
              "spc": spc.replace(/\+/g, '-').replace(/\//g, '_'),
              "asset_id": session.contentId
            };
            if (!_.isEmpty(authToken)) {
              body["auth_token"] = authToken;
            }
            return JSON.stringify(body);
          },
          prepareContentId: function(contentId) {
            if (!_.isEmpty(contentId)) {
              var pattern = "skd://";
              var index = contentId.indexOf(pattern);
              if (index > -1) {
                var assetId = contentId.substring(index + pattern.length);
                return decodeURIComponent(assetId);
              }
            }
            OOV4.log("Fairplay: Incorrect contentId");
            return "";
          },
          prepareLicense: function(laResponse) {
            if (_.isEmpty(laResponse)) {
              OOV4.log("Fairplay: Missing license response");
              return "";
            }
            var ckcStr = JSON.parse(laResponse).ckc;
            if (_.isEmpty(ckcStr)) {
              OOV4.log("Fairplay: Missing CKC");
              return "";
            }
            return ckcStr.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
          },
          prepareCertificate: function(certResponse) {
            if (!certResponse) {
              OOV4.log("Fairplay: Missing certificate response");
              return "";
            }
            var certJsonObj = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(certResponse)));
            var certStr = certJsonObj.certificate;
            if (_.isEmpty(certStr)) {
              OOV4.log("Fairplay: Missing certificate");
              return "";
            }
            certStr = OOV4.decode64(certStr.replace(/-/g, '+').replace(/_/g, '/'));
            var buf = new ArrayBuffer(certStr.length);
            var bufView = new Uint8Array(buf);
            for (var i = 0; i < certStr.length; i++) {
              bufView[i] = certStr.charCodeAt(i);
            }
            return bufView;
          }
        };
      }
    };

    /**
     * Executes playback on the bitmovin player.
     * @private
     * @method BitdashVideoWrapper#playVideo
     * @param {boolean} priming True if the video element is being setup for playback on devices
     */
    var playVideo = _.bind(function(priming) {
      _priming = priming;

      if (!_initialized || !_loaded) {
        this.load();
      }
      // PLAYER-1314
      // Priming needs to be done synchronously otherwise it won't work. When
      // priming we don't wait for player.setup or player.load to finish.
      // This should be re-tested when we enable Bitmovin HLS playback on Android and iOS.
      // PLAYER-1249
      // player.isReady will be true after player.setup is called (even if no
      // source is set at this point), so we also need to check whether we've
      // already loaded a source before actually starting playback.
      // The ready event will be fired once more after player.load succeeds,
      // so playVideo will be called again when that happens.
      if (_priming || (_loadSourceRequested && this.player.isReady())) {
        this.player.play();

        _shouldPause = false;
        _hasPlayed = true;
        _videoEnded = false;

        if (_seekTime !== null) {
          this.seek(_seekTime);
        }
      } else {
        _willPlay = true;
      }
    }, this);

    /**
     * Converts the desired seek time to a safe seek time based on the duration and platform.  If seeking
     * within OOV4.CONSTANTS.SEEK_TO_END_LIMIT of the end of the stream, seeks to the end of the stream.
     * @private
     * @method BitdashVideoWrapper#convertToSafeSeekTime
     * @param {number} time The desired seek-to position
     * @param {number} duration The video's duration
     * @returns {number} The safe seek-to position
     */
    var convertToSafeSeekTime = function(time, duration) {
      // If seeking within some threshold of the end of the stream, seek to end of stream directly
      if (duration - time < OOV4.CONSTANTS.SEEK_TO_END_LIMIT) {
        time = duration;
      }

      var safeTime = time >= duration ? duration - 2 : (time < 0 ? 0 : time);

      // iPad with 6.1 has an interesting bug that causes the video to break if seeking exactly to zero
      if (OOV4.isIpad && safeTime < 0.1) {
        safeTime = 0.1;
      }
      return safeTime;
    };

    var notifyAssetDimensions = _.bind(function() {
      var playbackVideoData = this.player.getPlaybackVideoData();
      if (playbackVideoData.width > 0) {
        this.controller.notify(this.controller.EVENTS.ASSET_DIMENSION, {
          width: playbackVideoData.width,
          height: playbackVideoData.height
        });
      }
    }, this);

    var logError = function(errorText) {
      if (!window.runningUnitTests) {
        console.error(errorText);
      }
    };

    /**
     * Checks to see if an encoding type is a DRM encoding type.
     * @private
     * @method BitdashVideoWrapper#_isDRMEncoding
     * @param {string} encoding OOV4.VIDEO.ENCODING value to check
     * @returns {boolean} True if the encoding type is a DRM encoding type, false otherwise
     */
    var _isDRMEncoding = _.bind(function(encoding) {
      return encoding === OOV4.VIDEO.ENCODING.DRM.DASH || encoding === OOV4.VIDEO.ENCODING.DRM.HLS;
    }, this);

    /**************************************************/
    // BitPlayer event callbacks
    /**************************************************/

    var _onAudioAdaptation = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onAudioChanged = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onAudioDownloadQualityChanged = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onAudioPlaybackQualityChanged = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onCueEnter = _.bind(function(data, params) {
      printevent(arguments);
      if (data && !data.text) {
        data = params || {};
      }
      //[PBW-5947] Bitmovin sometimes still fires cue events when disabled, don't render them
      if (_captionsDisabled) return;
      var subtitleList = _ccWrapper.find("ol").attr("id", "subtitles");
      if (!subtitleList || (subtitleList.length == 0)) {
        return;
      }
      var li = $('<li>');
      li.attr('data-state', data.text);
      li.text(data.text);
      subtitleList.append(li);
      if (!_ccVisible) {
        this.controller.notify(this.controller.EVENTS.CLOSED_CAPTION_CUE_CHANGED, _getSubtitleText(subtitleList));
      }
    }, this);

    var _onCueExit = _.bind(function(data) {
      printevent(arguments);
      var subtitleList = _ccWrapper.find("ol").attr("id", "subtitles");
      if (!subtitleList || (subtitleList.length == 0)) {
        return;
      }
      subtitleList.children().each(function() {
        if ($(this).attr('data-state') == data.text) {
          $(this).remove();
        }
      });
      if (!_ccVisible) {
        this.controller.notify(this.controller.EVENTS.CLOSED_CAPTION_CUE_CHANGED, _getSubtitleText(subtitleList));
      }
    }, this);

    var _onDownloadFinished = _.bind(function(data) {
      this.controller.notify(this.controller.EVENTS.ON_DOWNLOAD_FINISHED, data);
      printevent(arguments);
    }, this);

    var _onDVRWindowExceeded = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onError = _.bind(function(error, param) {
      printevent(arguments);
      if (error && !error.code) { // this is for test code to work
        error = param;
      }
      if (error && error.code) {
        var code = error.code.toString();
        if (bitdashErrorCodes[code]) {
          logError("bitdash error: " + error.code + ": " + bitdashErrorCodes[code].longText);
          //[PLAYER-491] Workaround of an issue on Edge with flash.hls where an error 3005 is thrown
          //Playback still works so we're ignoring error 3005 on Edge with flash.hls until
          //Bitmovin resolves this
          //TODO: Since we are simplifying the tech logic, we no longer have the concept of current
          //tech. We'll have to ignore all 3005 errors on Edge for now
          if (!(OOV4.isEdge && code === "3005")) {
            this.controller.notify(this.controller.EVENTS.ERROR, { errorcode: bitdashErrorCodes[code].ooErrorCode });
          }
        } else {
          logError("bitdash error: " + error.code + ": " + error.message);
        }
      }
    }, this);

    var _onFullscreenEnter = _.bind(function() {
      printevent(arguments);
      this.controller.notify(this.controller.EVENTS.FULLSCREEN_CHANGED,
                             { isFullScreen: true, paused: this.player.isPaused() });
    }, this);

    var _onFullscreenExit = _.bind(function() {
      printevent(arguments);
      this.controller.notify(this.controller.EVENTS.FULLSCREEN_CHANGED,
                             { isFullScreen: false, paused: this.player.isPaused() });
    }, this);

    var _onMetadata = _.bind(function(data, params) {
      printevent(arguments);
      var metadata = data.metadataType ? data : params; // for test code to work
      this.controller.notify(this.controller.EVENTS.METADATA_FOUND, {type:metadata["metadataType"],
                                                                     data:metadata["metadata"]});
    }, this);

    var _onMuted = _.bind(function() {
      printevent(arguments);
      this.controller.notify(this.controller.EVENTS.MUTE_STATE_CHANGE, { muted: true });
    }, this);

    var _onPaused = _.bind(function() {
      printevent(arguments);

      // Do not raise pause events while priming, but mark priming as completed
      if (_priming) {
        return;
      }

      this.controller.notify(this.controller.EVENTS.PAUSED);
    }, this);

    var _onPeriodSwitched = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onPlay = _.bind(function() {
      // In some cases an onPlay event from a previous source can be fired while
      // a new source is loading. This can happen when priming an ad video with an empty
      // source and then immediately setting the source of the actual video. The state
      // variables now belong to the new source, so we avoid executing this handler.
      if (this.player && !this.player.isReady()) {
        OOV4.log('Bitmovin: onPlay event received during source change, ignoring...');
        return;
      }
      printevent(arguments);

      // Do not raise play events while priming
      if (_priming) {
        return;
      }

      this.controller.notify(this.controller.EVENTS.PLAY, { url: _currentUrl });
    }, this);

    var _onPlaying = _.bind(function() {
      this.controller.notify(this.controller.EVENTS.PLAYING);
      if (!this.player.isMuted()) {
        this.controller.notify(this.controller.EVENTS.UNMUTED_PLAYBACK_SUCCEEDED);
      }
    }, this);

    var _onPlaybackFinished = _.bind(function() {
      printevent(arguments);
      if (_videoEnded) {
        // no double firing ended event
        return;
      }
      _videoEnded = true;
      this.controller.notify(this.controller.EVENTS.ENDED);
    }, this);

    var _onPlayerResize = _.bind(function() {
      printevent(arguments);
      notifyAssetDimensions();
    }, this);

    var _onReady = _.bind(function() {
      printevent(arguments);
      // Bitmovin fires onReady after both player.setup() and player.load().
      // When the event is fired after player.setup() the player is not ready to
      // play since no source is loaded at this point. We wait until isReady() returns
      // true, which is when the player is actually ready to play.
      if (!this.player.isReady()) {
        OOV4.log("Bitmovin: onReady fired before source load.");
        return;
      }
      this.controller.markReady();
      var captions =  this.player.getAvailableSubtitles() || [];
      if (captions.length > 0) {
        var availableLanguages = { locale: {}, languages: []};
        for (var i = 0; i < captions.length; i++) {
          if (captions[i].id) {
            var language = captions[i].lang;
            availableLanguages.languages.push(language);
            availableLanguages.locale[language] = _getCCLanguageLabel(language, captions[i].label);
          }
        }
        if (!_.isEmpty(availableLanguages.languages)) {
          this.controller.notify(this.controller.EVENTS.CAPTIONS_FOUND_ON_PLAYING, availableLanguages);
        }
      }
      var bitrates = this.player.getAvailableVideoQualities() || [];
      if (bitrates.length > 0) {
        OOV4.log("bitplayer reports bitrates: " + JSON.stringify(bitrates));
        _vtcBitrates = {};
        _vtcBitrates.auto = {id: "auto", width: 0, height: 0, bitrate: 0};
        for (var i = 0; i < bitrates.length; i++) {
          // Bitmovin will report a bitrate with a value of 0 if the stream only has one rendition.
          // We should hide the bitrate selector in such cases.
          if (typeof bitrates[i].bitrate === "number" && bitrates[i].bitrate > 0) {
            var vtcBitrate = {
              id: bitrates[i].id,
              width: bitrates[i].width,
              height: bitrates[i].height,
              bitrate: bitrates[i].bitrate
            };
            _vtcBitrates[vtcBitrate.id] = vtcBitrate;
          }
        }
        if (_.keys(_vtcBitrates).length > 1) {
          this.controller.notify(this.controller.EVENTS.BITRATES_AVAILABLE, _.values(_vtcBitrates));
        }
      }

      if (_setVolume >= 0) {
        this.setVolume(_setVolume);
        _setVolume = -1;
      }

      if (_setMute) {
        this.player.mute();
      }

      if (_willPlay) {
        if (this.player.isReady()) {
          this.play();
        } else {
          logError("bitdash error: player not ready to play");
        }
      }
    }, this);

    var _onSeek = _.bind(function() {
      printevent(arguments);
      _isSeeking = true;

      // Do not log seeks until the initialTime has been reached
      if (_initialTimeToReach > 0) {
        return;
      }

      // Do not raise seek events while priming
      if (_priming) {
        return;
      }

      this.controller.notify(this.controller.EVENTS.SEEKING, arguments[0].seekTarget);
    }, this);

    var _onSeeked = _.bind(function() {
      printevent(arguments);
      _isSeeking = false;
      _currentTime = this.player.getCurrentTime();

      // Do not log seeks until the initialTime has been reached
      if (_initialTimeToReach <= 0) {
        this.controller.notify(this.controller.EVENTS.SEEKED);
      }

      if (_shouldPause && !this.player.isPaused()) {
        this.pause();
      } else {
        _shouldPause = false;
      }

      if (!this.player.isPaused() ) {
        this.controller.notify(this.controller.EVENTS.PLAYING);
      }
    }, this);

    var _onSegmentRequestFinished = _.bind(function(data) {
      this.controller.notify(this.controller.EVENTS.ON_SEGMENT_LOADED, data);
      printevent(arguments);
    }, this);

    var _onSourceLoaded = _.bind(function() {
      printevent(arguments);
      _adsPlayed = false;
    }, this);

    var _onSourceUnloaded = _.bind(function(event) {
      // Currently this callback is not being used, but we will be implement unload soon, and it will be important for debugging
      printevent(event);
    }, this);

    var _onStallStarted = _.bind(function() {
      printevent(arguments);
      this.controller.notify(this.controller.EVENTS.BUFFERING, { url: _currentUrl });
    }, this);

    var _onStallEnded = _.bind(function() {
      printevent(arguments);
      this.controller.notify(this.controller.EVENTS.BUFFERED, { url: _currentUrl });
    }, this);

    var _onSubtitleAdded = _.bind(function() {
      printevent(arguments);
      var captions =  this.player.getAvailableSubtitles() || [];
      if (captions.length > 0) {
        var availableLanguages = { locale: {}, languages: []};
        for (var i = 0; i < captions.length; i++) {
          if (captions[i].id) {
            var language = captions[i].lang;
            availableLanguages.languages.push(language);
            availableLanguages.locale[language] = _getCCLanguageLabel(language, captions[i].label);
          }
        }
        if (!_.isEmpty(availableLanguages.languages)) {
          this.controller.notify(this.controller.EVENTS.CAPTIONS_FOUND_ON_PLAYING, availableLanguages);
        }
      }
    }, this);

    var _onSubtitleChanged = _.bind(function() {
      printevent(arguments);
      var subtitleList = _ccWrapper.find("ol").attr("id", "subtitles");
      if (!subtitleList || (subtitleList.length == 0)) {
        return;
      }
      subtitleList.empty();
      if (!_ccVisible) {
        this.controller.notify(this.controller.EVENTS.CLOSED_CAPTION_CUE_CHANGED, "");
      }
    }, this);

    var _onSubtitleRemoved = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onTimeChanged = _.bind(function(data) {
      // Do not log time updates after the stream has finished playing
      if (_videoEnded) {
        return;
      }
      if (_adsPlayed) {
        _adsPlayed = false;
        return;
      }

      var buffer, duration, currentLiveTime;
      if (this.player.isLive()) {
        _currentTime = this.player.getTimeShift() - this.player.getMaxTimeShift();
        duration = this.player.getMaxTimeShift() * -1;
        buffer = duration;
        // [PBW-5863] The skin displays current time a bit differently when dealing
        // with live video, but we still need to keep track of the actual playhead for analytics purposes
        currentLiveTime = this.player.getCurrentTime();
      } else {
        //Player-2020 On android we seem to get a time update before the player's current time is updated.
        //So we should update our currentTime according to the data that is passed in unless it doesn't exist.
        if (typeof(data.time) === "number") {
          _currentTime = data.time;
        } else {
          _currentTime = this.player.getCurrentTime();
        }
        buffer = this.player.getVideoBufferLength() + _currentTime;
        duration = this.player.getDuration();
        currentLiveTime = 0;
      }

      // Do not log time updates until the initialTime has been reached
      if (_currentTime < _initialTimeToReach) {
        return;
      }

      _initialTimeToReach = 0;

      this.controller.notify(this.controller.EVENTS.TIME_UPDATE,
                             { currentTime: _currentTime,
                               currentLiveTime: currentLiveTime,
                               duration: duration,
                               buffer: buffer,
                               seekRange: { "start" : 0, "end" : duration } });
    }, this);

    var _onTimeShift = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onTimeShifted = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onUnmuted = _.bind(function() {
      printevent(arguments);
      this.controller.notify(this.controller.EVENTS.MUTE_STATE_CHANGE, { muted: false });
    }, this);

    var _onVideoAdaptation = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onVideoDownloadQualityChanged = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onVideoPlaybackQualityChanged = _.bind(function() {
      printevent(arguments);
      notifyAssetDimensions();

      if (arguments.length > 0) {
        var targetQuality = arguments[0].targetQuality ? arguments[0].targetQuality : arguments[1].targetQuality; // for test code to work
        var bitrateId = targetQuality ? targetQuality.id : null;

        if (_vtcBitrates && bitrateId && (bitrateId != _currentBitRate)) {
          _currentBitRate = bitrateId;
          this.controller.notify(this.controller.EVENTS.BITRATE_CHANGED, _vtcBitrates[bitrateId]);
        }
      }
    }, this);

    var _onVolumeChanged = _.bind(function(volume) {
      printevent(arguments);
      //PLAYER-2171: We're observing an issue where player.getVolume is incorrectly returning 0 when the
      //targetVolume is set to a non-zero value. This may be related to its mute state. We'll use
      //the targetVolume until we find something more concrete
      var bitmovinVolume = volume && typeof volume.targetVolume === "number" ? volume.targetVolume : this.player.getVolume();
      var vol = bitmovinVolume / 100;
      this.controller.notify(this.controller.EVENTS.VOLUME_CHANGE, { volume: vol });
    }, this);

    var _onVRError = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onVrModeChanged = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onVrStereoChanged = _.bind(function() {
      printevent(arguments);
    }, this);

    var _onWarning = _.bind(function(warning) {
      if (warning.code === BITDASH_WARNING_CODES.USER_INTERACTION_REQUIRED) {
        this.controller.notify(this.controller.EVENTS.UNMUTED_PLAYBACK_FAILED, {error: warning});
      }
      printevent(arguments);
    }, this);

    var _onVrViewingDirectionChanged = _.bind(function(settings) {
      printevent(arguments);
      this.isVideoMoving = false;
      this.vrViewingDirection = settings.direction;
    }, this);

    var _onVrViewingDirectionChanging = _.bind(function(settings) {
      printevent(arguments);
      this.vrViewingDirection = settings.direction;
    }, this);

    var printevent = function(event, params) {
      if (event.length > 0 && event[0].timestamp) {
        // this is debugging code
        OOV4.log("bitplayer: " + event[0].type + " " + JSON.stringify(event[0], null, '\t'));
      } else {
        OOV4.log("bitplayer test log"); // for test code to work
      }
    };

    /**
     * Set view boundaries
     * @private
     * @param {object} {{yaw: number, roll: number, pitch: number}}
     * yaw - rotation around the vertical axis
     * roll - rotation around the front-to-back axis
     * pitch - rotation around the side-to-side axis
     * @method BitdashVideoWrapper#_setViewBoundaries
     * @returns {object} - сorrected corners according to acceptable limits
     */
    var _setViewBoundaries = function (params) {
      var limitsViewWindow = conf &&
        conf.source &&
        conf.source.vr &&
        conf.source.vr.viewWindow;

      var checkLimitsView = !!limitsViewWindow &&
        _.isNumber(limitsViewWindow.maxPitch) &&
        _.isNumber(limitsViewWindow.minPitch) &&
        _.isNumber(limitsViewWindow.maxYaw) &&
        _.isNumber(limitsViewWindow.minYaw);

      var checkArguments = !!params && _.isNumber(params.pitch) && _.isNumber(params.yaw);

      if(checkArguments && checkLimitsView){
        //Verification of vertical boundaries. [PLAYER-2448]
        params.pitch = params.pitch > limitsViewWindow.maxPitch ? limitsViewWindow.maxPitch : params.pitch;
        params.pitch = params.pitch < limitsViewWindow.minPitch ? limitsViewWindow.minPitch : params.pitch;

        //ToDo: It is necessary to describe the verification of horizontal boundaries
        // and take into account the intersection of points 0 and 360 along two axes
      }

      return _.extend({}, params);
    };
  };

  OOV4.Video.plugin(new BitdashVideoFactory());
}(OOV4._, OOV4.$));

},{"../../../html5-common/js/utils/InitModules/InitOO.js":1,"../../../html5-common/js/utils/InitModules/InitOOHazmat.js":2,"../../../html5-common/js/utils/InitModules/InitOOUnderscore.js":3,"../../../html5-common/js/utils/constants.js":4,"../../../html5-common/js/utils/environment.js":5,"../../../html5-common/js/utils/utils.js":6,"../lib/bitmovinplayer.js":11,"./helpers/polifillRequestAnimationFrame.js":10}],10:[function(require,module,exports){
/**
 * polyfill for CancelRequestAnimationFrame and RequestAnimationFrame
 * https://gist.github.com/paulirish/1579671
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 *
 * @description This is the new API and .. for Chrome and Safari is the webkitRequestAnimationFrame.
 * Accordingly, in Firefox, this is the mozRequestAnimationFrame.
 * Microsoft (Internet Explorer 10) will support msRequestAnimationFrame.
 * To cope with this, Eric Möller (Opera), Paul Irish (Google) and Tino Zijdel (Tweakers.net) created a polyfill.
 * In browsers where it is not supported at all, it will use setInterval
 *
 * About RequestAnimationFrame: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 *
 * To use this polyfill, connect this file to the script (require('path/to/file')) we need and requestAnimationFrame works!
 *
 * MIT license
 */
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    //compose the method name depending on the browser
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
      || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
  
  //if the browser does not support the requestAnimationFrame,
  // then window.requestAnimationFrame is assigned a similar implementation by means of setTimeout
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  
  //If the browser does not support cancelAnimationFrame, the animation is interrupted via clearTimeout
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
}());
},{}],11:[function(require,module,exports){
/**************************************************************************** 
 * Copyright (C) 2017, Bitmovin, Inc., All Rights Reserved 
 * 
 * This source code and its use and distribution, is subject to the terms 
 * and conditions of the applicable license agreement. 
 * 
 * Bitmovin Player Version 7.4.7 
 * 
 ****************************************************************************/
(function() {
})();

},{}]},{},[9]);