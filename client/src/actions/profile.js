import axios from 'axios'
import { setAlert} from './alert'
import { GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE, ACCOUNT_DELETED, CLEAR_PROFILE } from "./types";

// GEt cuurent user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/me')

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

export const createProfile = (formData, history, edit=false) => async dispatch => {
     try {
         const config = {
             headers:{
                 'Content-Type':'application/json'
             }
         }

         const res = await axios.post('http://localhost:5000/api/profile',formData,config)

         dispatch({
             type:GET_PROFILE,
             payload:res.data
         })

         dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'))

         if(!edit){
             history.push('/dashboard')
         }
     } catch (err) {

        const errors = err.response.data.errors

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')) )
        }
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
         
     }
}

export const addExperience = (formData,history) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('http://localhost:5000/api/profile/experience',formData,config)

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

        dispatch(setAlert('Added Experience','success'))
        history.push('/dashboard')
    } catch (err) {

       const errors = err.response.data.errors

       if(errors){
           errors.forEach(error => dispatch(setAlert(error.msg,'danger')) )
       }
       dispatch({
           type:PROFILE_ERROR,
           payload:{msg:err.response.statusText, status:err.response.status}
       })
        
    }
}

export const addEducation = (formData,history) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('http://localhost:5000/api/profile/education',formData,config)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert('Added Education','success'))
        history.push('/dashboard')
    } catch (err) {

       const errors = err.response.data.errors

       if(errors){
           errors.forEach(error => dispatch(setAlert(error.msg,'danger')) )
       }
       dispatch({
           type:PROFILE_ERROR,
           payload:{msg:err.response.statusText, status:err.response.status}
       })
        
    }
}

export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/experience/${id}`)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert('Removed Experience','success'))

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`)

        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })

        dispatch(setAlert('Removed Education','success'))

    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
    }
}

// delete account and profile
export const deleteAccount = (id) => async dispatch => {

    if(window.confirm('Are you Sure')){
        try {
            const res = await axios.delete(`http://localhost:5000/api/profile`)
    
            dispatch({
                type:CLEAR_PROFILE
            })
    
            dispatch({type:ACCOUNT_DELETED})

            dispatch(setAlert('Account Deleted','success'))
    
        } catch (err) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{msg:err.response.statusText, status:err.response.status}
            })
        }
    }
}
