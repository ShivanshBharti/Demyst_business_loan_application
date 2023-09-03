import { Button, Center, Card, Title, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

export const Home = () => {
	return <Center h='100vh'>
		<Card>
			<Stack>
				<Title>Are you looking for a business loan?</Title>
				<Button component={Link} to='/application' mt='lg'>Click to Initiate Loan Application</Button>
			</Stack>
		</Card>
	</Center>
}