type Props = {
    rowQuantity: number;
};

export const SkeletonRow = ({ rowQuantity }: Props) => (
    <tr>
        <td className="px-6 py-4">
            <div className="h-4 w-6 bg-gray-200 rounded" />
        </td>
        {Array.from({ length: rowQuantity }).map((_, i) => (
            <td key={i} className="px-6 py-4">
                <div className="h-4 w-24 bg-gray-200 rounded" />
            </td>
        ))}

        <td className="px-6 py-4">
            <div className="flex gap-2">
                <div className="h-8 w-16 bg-gray-200 rounded" />
                <div className="h-8 w-20 bg-gray-200 rounded" />
            </div>
        </td>
    </tr>
);
