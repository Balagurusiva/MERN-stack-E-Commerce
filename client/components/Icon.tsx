type Props = {
	name: string;
	size?: number;
	className?: string;
};

const Icon = ({ name, size = 24, className = "" }: Props) => (
	<img
		src={`/${name}.svg`}
		alt={`${name} icon`}
		width={size}
		height={size}
		className={className}
		style={{ color: "red" }}
	/>
);

export default Icon;
