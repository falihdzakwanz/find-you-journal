export default function StatItem({ label, value }: { label: string; value: string | number }) {
    return (
      <li className="flex justify-between py-2 border-b border-primary/20">
        <span className="text-dark-brown/80">{label}</span>
        <span className="font-medium text-dark-brown">{value}</span>
      </li>
    );
  }