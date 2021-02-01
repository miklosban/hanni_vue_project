<template>
    <div class="home">
        <!--<div class="preview-code">
            <div class="preview-code__box">
                <vue-code-highlight language="js" v-if="renderCode">
                    <pre>{{ JSON.stringify(output, null, 4) }}</pre>
                </vue-code-highlight>
            </div>
        </div>-->
        <div class="preview-form">
            <dd-form
                class="preview-form__interface preview-form__interface--wrappers"
                :data="output"
                :descriptions="descriptions"
                @submit="submit"
                @change="change"
                >
            </dd-form>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
/*import { component as VueCodeHighlight } from 'vue-code-highlight';
import "vue-code-highlight/themes/prism-tomorrow.css";
import "vue-code-highlight/themes/window.css";*/

export default {
    name: 'Home',
    props: {
    },
    methods: {

        submit({ data }) {
            this.output = data;
            //this.forceCodeRerender();

            axios({
                method: 'post',
                url: 'api/contacts.php',
                data: data,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                console.log(response)
                //app.contacts.push(contact)
                //app.resetForm();
            })
            .catch(function (response) {
                //handle error
                console.log(response)
            });
        },
        change({  data }) {
            console.log(data)
            this.output = data;
            //this.forceCodeRerender();
        },
        /*forceCodeRerender() {
            this.renderCode = false;
            this.$nextTick(() => {
                this.renderCode = true;
            });
        },*/
    },
    data() {
        return {
          output: {
          },
          descriptions: {
            "general": {
                "view": "group",
                "label": "Text",
                "class": [
                    "row",
                    "general"
                ],
                "wrapper": [
                    "row--boxed",
                    "col--2-3"
                ]

            },
            "general.text": { "view": "area", "html": false,  "label": "Szöveg"}, 

            "commons": {
                "view": "group",
                "label": "Common information",
                "wrapper": [
                    "row--boxed",
                    "col--1-3"
                ]
            },
            "commons.common_id": { view: 'text', label: 'Common ID'},
            "commons.common_name": { view: 'text', label: 'Common name'},
            "commons.start_year": { view: 'text', label: 'Start year'},
            "commons.end_year": { view: 'text', label: 'End year'},
            "commons.region": {
                "view": "select",
                "label": "Region",
                "options": [
                    "csík","gyergyó","udvarhely","kézdi","maros","kovászna","sepsi"
                    ]
                },
            "commons.type_of_common": {
                "view": "text",
                "label": "Type of Common",
                },

            "rules": {
                "view": "group",
                "label": "Rules",
                "wrapper": [
                    "col--1-1",
                    "row--boxed",
                    "rules"

                ]
            },
            "rules.original_rules_id": { view: 'text', label: 'Original rule ID'},
            "rules.individual_rules_id": { view: 'text', label: 'Individual rule ID'},
            "rules.rules_category": { view: 'select', label: 'Rule category', "options": [
                    "access","use","management","governance structure"
                    ] },
            "rules.rules_form": { view: 'select', label: 'Rule form', "options": [
                    "permission","obligation","prohibition","appointment","rejection","commons"
                    ] },
            "rules.rules_sequence": { view: 'select', label: 'Rule sequence', "options": [
                    "adjustment","annulation","first mentioning","repetition,singular mentioning"
                    ] },
            "rules.use_general": { view: 'select', label: 'Use general', "options": [
                    "animals","borders","housing","infrastructure","topsoil resources","subsoil resources","vegetation","water"
                    ] },
            "rules.governance_general": { view: 'select', label: 'Governance General', "options": [
                    "access","administration","finance","maintainence in general","management system","meetings and convocations","monitoring"
                    ] },
            "rules.party_category": { view: 'select', label: 'Party Category', "options": [
                    "everybody","members-right holders","non-members-right-holders"
                    ] },
            "rules.sanctions_number": { view: 'text', label: 'Sanctions Number' },
            "rules.party_offending": { view: 'select', label: 'Party Offending', "options": [
                    "everybody","members-right holders","non-members-right-holders"
                    ] },
            "rules.party_suffering": { view: 'select', label: 'Party Suffering', "options": [
                    "class of subjects","community","higher authority","single subject-person"
                    ] },
            "rules.harm_type": { view: 'select', label: 'Harm Type', "options": [
                    "damage on animals","d. Through anti-social behsavior","d. Throug negligence","damage on persons","d. On resources","d. th. Unjustified profit"
                    ] },
            "rules.liability_clause": { view: 'select', label: 'Liability Clause', "options": [
                    "0","1"
                    ] },
            "rules.graduated": { view: 'select', label: 'Graduated', "options": [
                    "0","1"
                    ] },
            "rules.differentiated": { view: 'select', label: 'Differentiated', "options": [
                    "0","1"
                    ] },
            "rules.monetary_payment": { view: 'select', label: 'Monetary payment', "options": [
                    "0","1"
                    ] },
            "rules.subdivision": { view: 'select', label: 'Subdivision', "options": [
                    "0","1"
                    ] },

          },
          //renderCode: true,
      }
    },
    /*components: {
        VueCodeHighlight,
    },*/
};
/*
export class APICommunicator implements IAPICommunicator 
{
    public _apiLink : string;
    private _axios : AxiosInstance;
    private _observers : ObserversRegistry;
    private _exceptionHandler : ExceptionHandler;

    constructor (axios : AxiosInstance, apiLink : string, observerRegistry : ObserversRegistry, exceptionHandler : ExceptionHandler)
    {
        this._apiLink = apiLink;
        this._axios = axios;
        this._observers = observerRegistry;
        this._exceptionHandler = exceptionHandler;
    }


    public getData (command : string, params = {}) : Promise<any>
    {

        this._observers.notify('loading', true);

        let paramsString = (params === {}) ? '' : this.prepareUrlParameters(params);

        return this._axios.get(this._apiLink + command + paramsString)
            .then (response => {

                this._observers.notify('loading', false);
                return response.data;
            })
            .catch(error => {
                this._observers.notify('loading', false);
                this._observers.notify('exception', {errorResponse : this.getResponseData(error.response), errorData : error.response.data });
                this._exceptionHandler.throwServerException(error.response.data, this.getResponseData(error.response));
            });
    }

   //  Similar communication function for other REST commands
   // public postData (command : string, data : any, params : IAssocString = {}, headers : IAssocString = {}): Promise<any>
   // public putData (command : string, data : any, params : IAssocString = {}, headers : IAssocString = {}): Promise<any>
   // public patchData (command : string, data : any, params : IAssocString = {}, headers : IAssocString = {}): Promise<any>
   // public deleteData (command : string, params = {}): Promise<any>
   
      
    private getResponseData(response : any) : object
    {

        return {
            status : response.status,
            statusText : response.statusText,
        }
    }


    private prepareUrlParameters (params : any) : string
    {
        let paramsString ='';

        if (typeof params === 'object') {
            paramsString = "?";

            for(let pn in params) {
                paramsString += pn + "=" + params[pn] + "&";
            }
            paramsString = paramsString.substring(0, paramsString.length - 1);  //remove tail &
        }

        return paramsString;
    }

}*/
</script>

<style lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.preview-form {
  width: 100%;
  background: white;
  padding: 40px 0;
  margin-top: 40px;
  &__interface {
    text-align: left;
    max-width: 700px;
    margin: 0 auto;
    &--wrappers {
      max-width: 100% !important;
      .view--root > .view--branch {
        flex-direction: row !important;
        flex-wrap: wrap !important;
        justify-content: left;
      }
      .row--boxed {
        margin-right: 60px;
      }
      .row--boxed .view__wrapper, .row--boxed .view__container {
        width: 100%;
      }
      .rules {
        margin-top: 60px;
      }
    }
  }
}
.preview-code {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 60px;
  &__box {
    width: 42.5%;
  }
}
</style>
