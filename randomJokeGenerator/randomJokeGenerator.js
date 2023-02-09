import { LightningElement, track, wire } from 'lwc';
import getJokeApiSettings from '@salesforce/apex/CustomSettingHandler.getJokeApiSettings';

export default class RandomJokeGenerator extends LightningElement {
    @track jokeData;
    @track calloutURI;

    @wire(getJokeApiSettings, {})
    getJokeApiSettings({ error, data }) {
        if (data) {
            this.calloutURI = data.URL__c;
            this.fetchJoke();
        } else if (error) {
            console.error(error);
        }
    }
    
    connectedCallback() {
        this.getJokeApiSettings;
    }
 
    fetchJoke() {
        fetch(this.calloutURI, {
            method: "GET"
        }).then((response) => response.json())
        .then((repos) => {
            this.jokeData = repos.joke;
        });
    }

    handleSubmit(){
        this.fetchJoke();
    }
}
