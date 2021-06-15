const registrationFields: any[] = []

export function addRegistrationFields(data: any[]) {
	registrationFields.push(...data)
}

export const getRegistrationFields = () => registrationFields