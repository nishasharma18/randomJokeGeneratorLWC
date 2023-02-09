public class CustomSettingHandler {
    @AuraEnabled (cacheable=true)
    public static Joke_API__c getJokeApiSettings(){
        system.debug('api:' + Joke_API__c.getOrgDefaults());
        return Joke_API__c.getOrgDefaults();
    }  
 }
