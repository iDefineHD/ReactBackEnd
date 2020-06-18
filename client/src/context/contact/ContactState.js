import React, { useReducer } from 'react'
import {v4 as uuid} from "uuid"; 
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CURRENT,
	FILTER_CURRENT,
	CLEAR_FILTER,
} from '../types'

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Jill Johnson',
				email: 'Jill@gmail.com',
				phone: '07914667997',
				type: 'professional',
			},
			{
				id: 2,
				name: 'Jen Johnson',
				email: 'Jen@gmail.com',
				phone: '07914667927',
				type: 'personal',
			},
			{
				id: 3,
				name: 'John Johnson',
				email: 'John@gmail.com',
				phone: '07914667957',
				type: 'personal',
			},
		],
		current: null,
		filtered: null
	}

	const [ state, dispatch ] = useReducer(contactReducer, initialState)

	// Add Contact

	const addContact = contact => {
		contact.id = uuid
		dispatch({
			type: ADD_CONTACT,
			payload: contact
		})
	}

	// Delete Contact

	const deleteContact = id => {
		dispatch({
			type: DELETE_CONTACT,
			payload: id
		})
	}

	//Set Current Contact

	const setCurrent = contact => {
		dispatch({
			type: SET_CURRENT,
			payload: contact
		})
	}

	//Clear Current Contact

	const clearCurrent = contact => {
		dispatch({
			type: CLEAR_CURRENT,
			payload: contact
		})
	}


	//Update Current Contact

	const updateContact = contact => {
		dispatch({
			type: UPDATE_CURRENT,
			payload: contact
		})
	}

	// Filter Current Contacts

	const filterContact = text => {
		dispatch({
			type: FILTER_CURRENT,
			payload: text
		})
	}

	// Clear Filter

	const clearFilter = text => {
		dispatch({
			type: CLEAR_FILTER,
		})
	}

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContact,
				clearFilter
			}}>
			{props.children}
		</ContactContext.Provider>
	)
}

export default ContactState
