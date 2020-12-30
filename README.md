# moodle_gdrivevideo

This is a plugin that allows to embed a video from google drive directly in the Atto Editor. The main features are: 

* Videos are embedded in the moodle page. 
* Visualization of videos is responsive to screen size. Yet, you can configure the maximum size of video. 
* Some sanitizing checks are carried out on the video URL provided, to avoid security problems. 
* In case that the video is not 

## Installation

Follow these steps to install and configure the plugin: 

1. Download the zip bundle from https://github.com/gmacia/moodle-atto_gdrivevideos
2. In your moodle installation (admin account), go to `Site administration / plugins / Install plugins / Install plugin from ZIP file`. 
3. Follow the installation instructions and check that there are no errors. 
4. Configure the icon button to be shown in atto editor. 
	* Go to `Site Administration / plugins / Atto toolbar settings`. 
	* Go to `toolbar config` at the end of the list of plugins. 
	* Insert the `gdrivevideos` icon in the group that you desire it to be shown. E.g., You can insert in the group of links, so it becomes: `links = link, gdrivevideos`. 

## How to use

* Step 1. Get a sharing link for your video in google drive.
* Step 2. Just use the gdrivevideos icon button in the atto editor and complete the form. You will see how the video is automatically embedded. 
* Step 3. In case that the sharing of the video is restricted to certain users or group, you must log in to google to visualize it. 

## To do

In order to publish as a moodle official plugin some things are needed: 

* Review strings to include both english and spanish strings. 
* Modify code to take all the strings from atto_gdrivevideos.php strings file. 
* Review and pulish code. 


