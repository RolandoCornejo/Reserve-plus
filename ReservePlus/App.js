import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('5gqqrj77o9Xb80qISWAQ9ar31oB1tSPUxae0LFZb','tUfDxfq5SEsyQkbhcy4P40x2quXiVfKYTgcsOGnF');
Parse.serverURL = 'https://parseapi.back4app.com/';