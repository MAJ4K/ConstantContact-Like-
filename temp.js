/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Set to client ID and API key from the Developer Console
const CLIENT_ID = '68371502184-pr5pircndiuvp0ol0kkase5cn12i01b5.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBKkP7HyB-nYOrTm83u1-pC30gPcTT-YGM';


// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/contacts.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
	gapi.load('client', intializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function intializeGapiClient() {
	await gapi.client.init({
	apiKey: API_KEY,
	discoveryDocs: [DISCOVERY_DOC],
	});
	gapiInited = true;
	maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
	tokenClient = google.accounts.oauth2.initTokenClient({
	client_id: CLIENT_ID,
	scope: SCOPES,
	callback: '', // defined later
	});
	gisInited = true;
	maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
	if (gapiInited && gisInited) {
	document.getElementById('authorize_button').style.visibility = 'visible';
	}
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
	tokenClient.callback = async (resp) => {
	if (resp.error !== undefined) {
		throw (resp);
	}
	document.getElementById('signout_button').style.visibility = 'visible';
	document.getElementById('authorize_button').innerText = 'Refresh';
	await listConnectionNames();
	};
	console.log(gapi.client);
	if (gapi.client.getToken() === null) {
	// Prompt the user to select a Google Account and ask for consent to share their data
	// when establishing a new session.
	tokenClient.requestAccessToken({prompt: 'consent'});
	} else {
	// Skip display of account chooser and consent dialog for an existing session.
	tokenClient.requestAccessToken({prompt: ''});
	}
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
	const token = gapi.client.getToken();
	if (token !== null) {
	google.accounts.oauth2.revoke(token.access_token);
	gapi.client.setToken('');
	document.getElementById('content').innerText = '';
	document.getElementById('authorize_button').innerText = 'Authorize';
	document.getElementById('signout_button').style.visibility = 'hidden';
	}
}

/**
 * Print the display name if available for 10 connections.
 */
async function listConnectionNames() {
	let response;
	try {
	// Fetch first 10 files
	response = await gapi.client.people.people.connections.list({
		'resourceName': 'people/me',
		'pageSize': 200,
		'personFields': 'names,emailAddresses',
	});
	} catch (err) {
		console.error(err)
	document.getElementById('content').innerText = err.message;
	return;
	}
	const connections = response.result.connections;
	if (!connections || connections.length == 0) {
	document.getElementById('content').innerText = 'No connections found.';
	return;
	}
	// Flatten to string to display
	var isEmail = '',isPhone = '';
	const output = connections.reduce(
		(str, person) => {
		if (!person.names || person.names.length === 0) {
			return `${str}Missing display name\n`;
		}
		else if (!person.emailAddresses || person.emailAddresses.length === 0){
			return `${str}${person.names[0].displayName}\n`;
		}
		isEmail = "EMAIL\t";
		return `${str}${person.names[0].displayName}\t${person.emailAddresses[0].value}\n`;
		},"");
		localStorage.setItem("gMail-contacts",'NAME\t'+ isEmail + isPhone +'\n' + output);
		addList("gMail-contacts");
}