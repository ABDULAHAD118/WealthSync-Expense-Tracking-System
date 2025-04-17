import { ReactNode } from 'react';

interface InfoCardProps {
    icon: ReactNode;
    label: string;
    value: string;
    color: string;
}
const InfoCard = (props: InfoCardProps) => {
    const { icon, label, value, color } = props;
    return <div>InfoCard</div>;
};

export default InfoCard;
