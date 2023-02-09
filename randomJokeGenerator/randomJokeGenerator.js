import { LightningElement, track, wire } from 'lwc';
import getJokeApiSettings from '@salesforce/apex/CustomSettingHandler.getJokeApiSettings';

export default class RandomJokeGenerator extends LightningElement {
    @track jokeData;
    @track calloutURI;

    @wire(getJokeApiSettings, {})
    getJokeApiSettings({ error, data }) {
        if (data) {
            console.log('data: '+ JSON.stringify(data));
            this.calloutURI = data.URL__c;
            console.log('calloutURI 2: ' + this.calloutURI);
            this.fetchJoke();
        } else if (error) {
            console.error(error);
        }
    }
    
    connectedCallback() {
        this.getJokeApiSettings;
    }
 
    fetchJoke() {
        //const calloutURI = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
        fetch(this.calloutURI, {
            method: "GET"
        }).then((response) => response.json())
        .then((repos) => {
            console.log('repos:' + JSON.stringify(repos))
            this.jokeData = repos.joke;
            console.log(this.jokeData);
        });
    }

    handleSubmit(){
        this.fetchJoke();
    }
}