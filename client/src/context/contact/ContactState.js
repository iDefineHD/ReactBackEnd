import React, { useReducer } from 'react'
import uuid from 'uuid'
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
				id: 1,
				name: 'Jen Johnson',
				email: 'Jen@gmail.com',
				phone: '07914667927',
				type: 'personal',
			},
			{
				id: 1,
				name: 'John Johnson',
				email: 'John@gmail.com',
				phone: '07914667957',
				type: 'personal',
			},
		],
	}

	const [ state, dispatch ] = useReducer(contactReducer, initialState)

	// Add Contact

	// Delete Contact

	//Set Current Contact

	//Clear Current Contact

	//Update Current Contact

	// Filter Current Contacts

	// Clear Filter

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
			}}>
			{props.children}
		</ContactContext.Provider>
	)
}

export default ContactState
