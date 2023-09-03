import { Button, Center, Card, Title, Stack, Input, Select, NumberInput } from '@mantine/core';
import { useForm } from "@mantine/form";
import { DateInput } from '@mantine/dates';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formatDate = (date) => {
	return date.toISOString().split('T')[0];
}

const createPayload = (data) => {
	return {
		...data,
		accounting_period_start: formatDate(data.accounting_period_start),
		accounting_period_end: formatDate(data.accounting_period_end),
		reporting_date: formatDate(data.reporting_date),
	}
}

export const Application = () => {
	const form = useForm({
		initialValues: {
			name: "",
			business_name: "",
			email: "",
			company_id: "",
			reporting_date: "",
			account_names: "",
			account_balances: "",
			asset_currency: "",
			loan_amount: "",
			accounting_partner: "",
			exchange_rate: "",
			accounting_period_start: "",
			accounting_period_end: "",
		},
	});

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const payload = createPayload(data);
		const res = await axios.post('http://localhost:8000/application_data', payload);
		navigate('/review', { state: res.data });
	}

	return (
		<Center h='100vh'>
			<Card>
				<Title mb='lg'>Enter the following details</Title>
				<form onSubmit={form.onSubmit(onSubmit)}>
					<Stack>
						<Input {...form.getInputProps("name")} placeholder="Name" required />
						<Input {...form.getInputProps("business_name")} placeholder="Business Name" required />
						<Input {...form.getInputProps("email")} placeholder="Email" required />
						<Input {...form.getInputProps("company_id")} placeholder="Company ID or Code" required />
						<DateInput {...form.getInputProps("reporting_date")} placeholder="Reporting Date" required />
						<Input {...form.getInputProps("account_names")} placeholder="Account Names or Codes" required />
						<NumberInput {...form.getInputProps("account_balances")} placeholder="Account Balances" required />
						<Input {...form.getInputProps("asset_currency")} placeholder="Asset Account Currency Codes" required />
						<NumberInput {...form.getInputProps("loan_amount")} placeholder="Loan Amount" required />
						<Select {...form.getInputProps("accounting_partner")} data={[
							{ value: 'xero', label: 'Xero' },
							{ value: 'MYOB', label: 'MYOB' },
						]} placeholder='Select accounting partner' required />
						<NumberInput {...form.getInputProps("exchange_rate")} placeholder="Currency Exchange Rate" required />
						<DateInput {...form.getInputProps("accounting_period_start")} placeholder="Accounting Period Start Date" required />
						<DateInput {...form.getInputProps("accounting_period_end")} placeholder="Accounting Period End Date" required />
						<Button type='submit'>Submit Application</Button>
					</Stack>
				</form>
			</Card>
		</Center >)
}