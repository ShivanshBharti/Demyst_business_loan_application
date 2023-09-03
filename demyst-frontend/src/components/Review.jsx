import { Button, Center, Card, Title, Stack, Text, Group, Badge } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Review = () => {
	const data = useLocation().state.data;
	const navigate = useNavigate();

	const createPayload = () => {
		return {
			business_name: data.business_name,
			year_established: data.reporting_date,
			profit_or_loss_summary: data.total_profit_or_loss,
			assets_summary: data.average_asset_value,
			loan_amount: data.loan_amount,
		}
	}

	const onSubmit = async () => {
		const payload = createPayload(data);
		const res = await axios.post('http://localhost:8000/submit_application', payload);
		navigate('/final', { state: res.data });
	}

	return <Center h='100vh'>
		<Card>
			<Stack>
				<Title>Application Review</Title>
				{Object.keys(data).map((key) => {
					return <Group key={key}>
						<Badge variant='outline' radius='xs'>{key}</Badge>
						<Text>{data[key]}</Text>
					</Group>
				})}
				<Button mt='lg' onClick={onSubmit}>Submit</Button>
			</Stack>
		</Card>
	</Center>
}