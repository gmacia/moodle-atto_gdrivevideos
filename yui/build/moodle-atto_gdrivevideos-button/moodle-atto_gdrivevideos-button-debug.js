YUI.add('moodle-atto_gdrivevideos-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_gdrivevideos
 * @copyright  COPYRIGHTINFO
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_gdrivevideos-button
 */

/**
 * Atto text editor gdrivevideos plugin.
 *
 * @namespace M.atto_gdrivevideos
 * @class button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_gdrivevideos';
var LOGNAME = 'atto_gdrivevideos';

var STRINGS = {
	ERROR_URL: 'ERROR: La URL del video debe ser un fichero compartido de Google Drive. Compruebe que ha copiado correctamente el enlace.'
	};

var TEMPLATE_VIDEO_PROTECTED = '' +	
		'<div style="position:relative; overflow:hidden; width:100%; max-width:{{width}}px;' + 
							'padding-top:min(56.25%,{{height}}px);">' +
		'	<object style="position:absolute; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" data="{{url}}">' + 
		'		<p>No puede visualizar el video por no estar registrado en su navegador con la cuenta go.ugr.es.</p>' +
		'		<p>Seleccionar este enlace para ver el video: <a href="{{url}}" target="_blank">[Ver video]</a></p>'+
		'	</object>' +
		'	<div style="width: 80px; height: 80px; position: absolute; opacity: 0; right: 0px; top: 0px;">&nbsp;</div>' +
		'</div>';
		
var TEMPLATE_VIDEO = '' +	
		'<div style="position:relative; overflow:hidden; width:100%; max-width:{{width}}px;' + 
							'padding-top:min(56.25%,{{height}}px);">' +
		'	<object style="position:absolute; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" data="{{url}}">' + 
		'		<p>No puede visualizar el video por no estar registrado en su navegador con la cuenta go.ugr.es.</p>' +
		'		<p>Seleccionar este enlace para ver el video: <a href="{{url}}" target="_blank">[Ver video]</a></p>'+
		'	</object>' +
		'</div>';


var TEMPLATE_DIALOG = '' + 
    '<div class="atto_gdrivevideos_frame">' +
        '<div >' + 
            '<label class="mdl-lft-align">Elija tamaño máximo del vídeo (16:9):' +
            '<span class="">El tamaño del video se adaptará automáticamente al de la pantalla cuando sea menor que el indicado.</span>  </label>' +
            '<select id="resolution" name="resolution" value="640x360" style="justify-self:auto;"> ' +
                '<option value="640x360">640x360</option>' +
                '<option value="1280x720">1280x720</option>' +
            '</select>' +
        '</div><br>' +
        '<div class="mdl-lft-align">' + 
            'URL (copiar y pegar el enlace de Google Drive): <input type="text" size="50" id="url" value=""></input>' + 
        '</div><br>' + 
        '<div class="mdl-lft-align">' + 
            '<input id="protegido" type="checkbox"> </input>' + 
            ' Proteger enlace de vídeo. <br>' + 
            '<span class="mdl-lft-align atto_gdrivevideos_smallfont">Haga click en proteger si quiere bloquear el botón de abrir en nueva ventana de Google. Esto dificulta la copia del enlace del vídeo, aunque no imposibilita hacerlo por otros medios. Como desventaja, no se permitirá al estudiante ver en pantalla completa el vídeo.</span></label>' +
        '</div><br>' + 
        '<div id="id_insert" class="mdl-align"> ' +
            '<button class="atto_gdrivevideos_button atto_media_urlentrysubmit">Insertar</button>' + 
        '</div>' +
    '</div>';

Y.namespace('M.atto_gdrivevideos').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    initializer: function() {
        // If we don't have the capability to view then give up.
        if (this.get('disabled')){
            return;
        }


        if(this.get('customicon')) {
            var iconurl = decodeURIComponent(this.get('customicon'));
            var iconname = 'atto_gdrivevideos';
            // Add the gdrivevideos icon/buttons
            this.addButton({
                iconurl: iconurl,
                buttonName: iconname,
                callback: this._displayDialogue,
                callbackArgs: iconname
            });

        }else{
            // Add the gdrivevideos icon/buttons
            var iconname = 'iconone';
            this.addButton({
                icon: 'ed/' + iconname,
                iconComponent: 'atto_gdrivevideos',
                buttonName: iconname,
                callback: this._displayDialogue,
                callbackArgs: iconname
            });
        }
    },



     /**
     * Display the gdrivevideos dialog
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e, clickedicon) {
        e.preventDefault();
        var width=600;

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            width: width + 'px',
            focusAfterHide: clickedicon
        });
		//dialog doesn't detect changes in width without this
		//if you reuse the dialog, this seems necessary
        if(dialogue.width !== width + 'px'){
            dialogue.set('width',width+'px');
        }

        //create content container

		var content = Y.Handlebars.compile(TEMPLATE_DIALOG)({ });
        var bodycontent = Y.Node.create(content);
		bodycontent.one('#id_insert').on('click', this._doInsertGdriveTemplate, this);
		
        //set to bodycontent
        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();

    },

     /**
     * Insert information in atto editor
     *
     * @method _displayDialogue
     * @private
     */
     
	_doInsertGdriveTemplate: function (e) {
		e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        // Extract information from dialogue
        var resolution = Y.one('#resolution').get('value');
        var width = resolution.substring(0,resolution.indexOf("x"));
		var height = width*9/16;  // We assume 16:9 screen
		var url = Y.one('#url').get('value');
        var protegido = Y.one('#protegido').get('checked');
       
        // Sanitize URL. Check url to see if it belongs to a google drive file. 
        // In addition, in case /view url is copied, it is substituted by /preview
        
        if (!url.startsWith("https://drive.google.com/file/")) {
			alert(STRINGS.ERROR_URL);
			return;
		}
        url = url.replace('/view', '/preview');
        
		// Build content
        var retstring = '',
			template,
			content = '';

		if (protegido) {
			template = TEMPLATE_VIDEO_PROTECTED;
		}
		else {
			template = TEMPLATE_VIDEO;
		}	
		content = Y.Handlebars.compile(template)({
			url: url,
			width: width,
			height: height
		});
		
		retstring += content;

		// Insert content in editor
        this.editor.focus();
        this.set('isHTML', false);
        this.get('host').insertContentAtFocusPoint(retstring);
        this.set('isHTML', true);
        this.markUpdated();
	}

}, { ATTRS: {
    disabled: {
        value: false
    },

    keys: {
        value: null
    },

    names: {
        value: null
    },

	variables: {
        value: null
    },

    defaults: {
        value: null
    },
 
    instructions: {
        value: null
    },
    customicon: {
        value: null
    },
    ends: {
        value: null
    }
 }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
