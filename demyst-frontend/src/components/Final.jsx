import { Group, Badge, Text, Center, Card, Title, Stack } from '@mantine/core';
import { useLocation } from 'react-router-dom';

export const Final = () => {
	const data = useLocation().state;

	return <Center h='100vh'>
		<Card>
			<Stack>
				<Title>Data for decision engine</Title>
				{Object.keys(data).map((key) => {
					return <Group key={key}>
						<Badge variant='outline' radius='xs'>{key}</Badge>
						<Text>{data[key]}</Text>
					</Group>
				})}
			</Stack>
		</Card>
	</Center>
}