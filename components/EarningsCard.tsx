
'use client';

interface Earning {
  id: string;
  trip_pod_id: string;
  ride_request_id: string;
  amount: number;
  commission: number;
  net_amount: number;
  payout_status: string;
  created_at: string;
  trip_pods: {
    from_location: string;
    to_location: string;
    departure_date: string;
  };
  ride_requests: {
    seats_requested: number;
    users: {
      full_name: string;
    };
  };
}

interface EarningsCardProps {
  earning: Earning;
}

export default function EarningsCard({ earning }: EarningsCardProps) {
  const getPayoutStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPayoutStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return 'ri-time-line text-yellow-500';
      case 'processing': return 'ri-loader-line text-blue-500';
      case 'completed': return 'ri-checkbox-circle-line text-green-500';
      case 'failed': return 'ri-error-warning-line text-red-500';
      default: return 'ri-question-line text-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const commissionRate = ((earning.commission / earning.amount) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-route-line text-blue-500"></i>
            </div>
            <h3 className="font-semibold text-gray-900">
              {earning.trip_pods.from_location} → {earning.trip_pods.to_location}
            </h3>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-calendar-line"></i>
              </div>
              <span>{formatDate(earning.trip_pods.departure_date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-user-line"></i>
              </div>
              <span>{earning.ride_requests.users.full_name}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-group-line"></i>
              </div>
              <span>{earning.ride_requests.seats_requested} seat{earning.ride_requests.seats_requested > 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPayoutStatusColor(earning.payout_status)}`}>
            <div className="w-3 h-3 flex items-center justify-center inline-block mr-1">
              <i className={getPayoutStatusIcon(earning.payout_status)}></i>
            </div>
            {earning.payout_status.charAt(0).toUpperCase() + earning.payout_status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-money-naira-circle-line text-blue-500"></i>
            </div>
            <span className="text-sm text-blue-700">Gross</span>
          </div>
          <p className="font-semibold text-blue-900">₦{earning.amount.toLocaleString()}</p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-percent-line text-orange-500"></i>
            </div>
            <span className="text-sm text-orange-700">Commission ({commissionRate}%)</span>
          </div>
          <p className="font-semibold text-orange-900">₦{earning.commission.toLocaleString()}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-wallet-line text-green-500"></i>
            </div>
            <span className="text-sm text-green-700">Net Earnings</span>
          </div>
          <p className="font-semibold text-green-900">₦{earning.net_amount.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-time-line text-gray-500"></i>
            </div>
            <span className="text-gray-600">Earned on {formatDate(earning.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            {earning.payout_status === 'pending' && (
              <span className="text-yellow-600">Payout pending</span>
            )}
            {earning.payout_status === 'processing' && (
              <span className="text-blue-600">Processing payout</span>
            )}
            {earning.payout_status === 'completed' && (
              <span className="text-green-600">Paid out</span>
            )}
            {earning.payout_status === 'failed' && (
              <span className="text-red-600">Payout failed</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
