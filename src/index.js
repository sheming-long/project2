/* eslint-disable eol-last */
import jQuery from 'jquery';
import _ from 'lodash'
import {a} from '@/scripe/app'
// eslint-disable-next-line import/no-unresolved
import '@/index.css';
jQuery(function () {
    console.log('123')
});
jQuery.ajax({
    url:'http://127.0.0.1:3000/api/abc',
})

jQuery.ajax({
    url: 'http://127.0.0.1:3000/api1/abc1',
})
console.log(_);
// console.log("process.env.NODE.ENV",process.env.NODE.ENV)