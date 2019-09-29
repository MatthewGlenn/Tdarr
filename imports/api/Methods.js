
import { Meteor } from 'meteor/meteor';

import { FileDB, SettingsDB } from '../api/tasks.js';



//Globals
var fs = require('fs');
var path = require('path');

const shortid = require('shortid');

Meteor.methods({



    'remove'() {


        FileDB.remove({});
        SettingsDB.remove({});


    },


    'consolelog'(message) {


        console.log(message)


    },

    'removelibrary'(DB) {


        FileDB.remove({ DB: DB });



    },



    'addPluginInclude'(DB_id, ele) {




        SettingsDB.update({
            '_id': DB_id,


        }, {
            $addToSet: {
                "pluginIDs": {
                    _id: ele,
                    checked: false,
                }
            }
        })



    },

    'updatePluginInclude'(DB_id, ele, status) {




        SettingsDB.update({
            "_id": DB_id,
            "pluginIDs._id": ele
        }, {
            $set: { "pluginIDs.$.checked": status }
        },
            false,
            true

        );
    },
    'removePluginInclude'(DB_id, ele) {

        SettingsDB.update(
            { "_id": DB_id },
            { $pull: { 'pluginIDs': { _id: ele } } }
        );

    },








    'addVideoCodecExclude'(DB_id, ele) {


        SettingsDB.update({
            '_id': DB_id,


        }, {
            $addToSet: {
                "decisionMaker.video_codec_names_exclude": {
                    _id: shortid.generate(),
                    codec: ele,
                    checked: false,
                }
            }
        })



    },

    'updateVideoCodecExclude'(DB_id, ele, status) {




        SettingsDB.update({
            "_id": DB_id,
            "decisionMaker.video_codec_names_exclude.codec": ele
        }, {
            $set: { "decisionMaker.video_codec_names_exclude.$.checked": status }
        },
            false,
            true

        );
    },
    'removeVideoCodecExclude'(DB_id, ele) {

        SettingsDB.update(
            { "_id": DB_id },
            { $pull: { 'decisionMaker.video_codec_names_exclude': { codec: ele } } }
        );

    },
    'addAudioCodecExclude'(DB_id, ele) {


        SettingsDB.update({
            '_id': DB_id,


        }, {
            $addToSet: {
                "decisionMaker.audio_codec_names_exclude": {
                    _id: shortid.generate(),
                    codec: ele,
                    checked: false,
                }
            }
        })



    },

    'updateAudioCodecExclude'(DB_id, ele, status) {


        SettingsDB.update({
            "_id": DB_id,
            "decisionMaker.audio_codec_names_exclude.codec": ele
        }, {
            $set: { "decisionMaker.audio_codec_names_exclude.$.checked": status }
        },
            false,
            true

        );
    },
    'removeAudioCodecExclude'(DB_id, ele) {

        SettingsDB.update(
            { "_id": DB_id },
            { $pull: { 'decisionMaker.audio_codec_names_exclude': { codec: ele } } }
        );

    }, 'updateScheduleBlock'(DB_id, ele, status) {


        SettingsDB.update({
            "_id": DB_id,
            "schedule._id": ele
        }, {
            $set: { "schedule.$.checked": status }
        },
            false,
            true

        );
    }, 'toggleSchedule'(DB_id, status) {

        
        var chxBoxes = SettingsDB.find({_id: DB_id}, {}).fetch()
        chxBoxes = chxBoxes[0].schedule

        

        for (var i = 0; i < chxBoxes.length; i++) {

            SettingsDB.update({
                "_id": DB_id,
                "schedule._id": chxBoxes[i]._id
            }, {
                $set: { "schedule.$.checked": status }
            },
                false,
                true

            );

        }
    }

});








