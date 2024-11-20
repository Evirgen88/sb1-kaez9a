import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CreditCard, 
  Calendar, 
  DollarSign, 
  User, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw,
  Edit2,
  CheckSquare,
  History,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Code
} from 'lucide-react';

// Transaction status type
type TransactionStatus = 'success' | 'pending' | 'failed';
type TransactionType = 'sale' | 'preauth' | 'refund' | 'cancel' | 'capture';

// Transaction log interface
interface TransactionLog {
  id: string;
  timestamp: string;
  action: string;
  description: string;
  user: string;
  status: 'info' | 'warning' | 'error' | 'success';
  request?: string;
  response?: string;
}

function TransactionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showLogs, setShowLogs] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showCaptureModal, setShowCaptureModal] = useState(false);
  const [editNote, setEditNote] = useState('');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  // Mock transaction data
  const transaction = {
    id: id,
    date: new Date().toISOString(),
    amount: 1250.00,
    currency: 'TRY',
    status: 'success' as TransactionStatus,
    type: 'preauth' as TransactionType,
    customerName: 'John Doe',
    cardNumber: '**** **** **** 1234',
    cardType: 'Visa',
    installment: '1',
    description: 'Sample transaction',
    authCode: '123456',
    referenceNo: 'REF123456',
    merchantId: 'MERCH001',
    terminalId: 'TERM001',
    secure3d: true,
    remainingAmount: 1250.00, // For partial refunds/captures
  };

  // Mock transaction logs with request/response data
  const transactionLogs: TransactionLog[] = [
    {
      id: '1',
      timestamp: new Date().toISOString(),
      action: 'Transaction Created',
      description: 'Payment request initiated',
      user: 'System',
      status: 'info',
      request: JSON.stringify({
        merchantId: 'MERCH001',
        terminalId: 'TERM001',
        amount: 1250.00,
        currency: 'TRY',
        cardNumber: '4111111111111111',
        expiry: '12/24',
        cvv: '123',
        secure3d: true,
        returnUrl: 'https://merchant.com/callback'
      }, null, 2),
      response: JSON.stringify({
        status: 'success',
        transactionId: 'TRX123456',
        redirectUrl: 'https://3dsecure.bank.com/auth'
      }, null, 2)
    },
    {
      id: '2',
      timestamp: new Date().toISOString(),
      action: '3D Secure',
      description: '3D Secure authentication successful',
      user: 'System',
      status: 'success',
      request: JSON.stringify({
        transactionId: 'TRX123456',
        paRes: 'eJzj4A1NTc1NTE7MyU3MS00FAA...',
        md: '12345678'
      }, null, 2),
      response: JSON.stringify({
        status: 'success',
        authenticationStatus: 'Y',
        cavv: 'AAABB2gHA1B5EFNIYHZhAAAAAAA=',
        eci: '05'
      }, null, 2)
    },
    {
      id: '3',
      timestamp: new Date().toISOString(),
      action: 'Authorization',
      description: 'Payment authorized successfully',
      user: 'System',
      status: 'success',
      request: JSON.stringify({
        transactionId: 'TRX123456',
        merchantId: 'MERCH001',
        terminalId: 'TERM001',
        amount: 1250.00,
        currency: 'TRY',
        cavv: 'AAABB2gHA1B5EFNIYHZhAAAAAAA=',
        eci: '05'
      }, null, 2),
      response: JSON.stringify({
        status: 'success',
        authCode: '123456',
        referenceNo: 'REF123456',
        responseCode: '00',
        responseMessage: 'Approved'
      }, null, 2)
    },
  ];

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: TransactionStatus) => {
    switch (status) {
      case 'success':
        return 'Başarılı';
      case 'pending':
        return 'Beklemede';
      case 'failed':
        return 'Başarısız';
      default:
        return status;
    }
  };

  const getTypeText = (type: TransactionType) => {
    switch (type) {
      case 'sale':
        return 'Satış';
      case 'preauth':
        return 'Ön Provizyon';
      case 'refund':
        return 'İade';
      case 'cancel':
        return 'İptal';
      case 'capture':
        return 'Ön Prov. Kapama';
      default:
        return type;
    }
  };

  const handleRefund = () => {
    setShowRefundModal(true);
  };

  const handleCapture = () => {
    setShowCaptureModal(true);
  };

  const handleCancel = () => {
    if (window.confirm('İşlemi iptal etmek istediğinize emin misiniz?')) {
      // Handle cancel logic
      console.log('Transaction cancelled');
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const getLogStatusIcon = (status: TransactionLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const toggleLogDetails = (logId: string) => {
    setExpandedLogId(expandedLogId === logId ? null : logId);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            İşlem Detayı #{id}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transaction.status)}`}>
            {getStatusText(transaction.status)}
          </span>
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <History className="w-4 h-4 mr-2" />
            {showLogs ? 'Detayları Göster' : 'İşlem Logları'}
          </button>
        </div>
      </div>

      {!showLogs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* İşlem Bilgileri */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
              <DollarSign className="w-5 h-5 mr-2" />
              İşlem Bilgileri
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">İşlem Tipi</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{getTypeText(transaction.type)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tutar</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                  {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: transaction.currency
                  }).format(transaction.amount)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Tarih</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                  {new Date(transaction.date).toLocaleString('tr-TR')}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Taksit</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                  {transaction.installment === '1' ? 'Tek Çekim' : `${transaction.installment} Taksit`}
                </dd>
              </div>
            </dl>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {transaction.status === 'success' && (
                <>
                  {transaction.type === 'sale' && (
                    <>
                      <button
                        onClick={handleRefund}
                        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        İade
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        İptal
                      </button>
                    </>
                  )}
                  {transaction.type === 'preauth' && (
                    <button
                      onClick={handleCapture}
                      className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      <CheckSquare className="w-4 h-4 mr-2" />
                      Son Provizyon
                    </button>
                  )}
                </>
              )}
              <button
                onClick={handleEdit}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Düzenle
              </button>
            </div>
          </div>

          {/* Kart Bilgileri */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
              <CreditCard className="w-5 h-5 mr-2" />
              Kart Bilgileri
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Kart Numarası</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{transaction.cardNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Kart Tipi</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{transaction.cardType}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Müşteri Adı</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{transaction.customerName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">3D Secure</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">
                  {transaction.secure3d ? 'Evet' : 'Hayır'}
                </dd>
              </div>
            </dl>
          </div>

          {/* Teknik Detaylar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
              <Clock className="w-5 h-5 mr-2" />
              Teknik Detaylar
            </h2>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Yetki Kodu</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{transaction.authCode}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Referans No</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{transaction.referenceNo}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Üye İşyeri No</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{transaction.merchantId}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Terminal No</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{transaction.terminalId}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Açıklama</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300">{transaction.description}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        // Transaction Logs View
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">İşlem Logları</h2>
          <div className="space-y-4">
            {transactionLogs.map((log) => (
              <div
                key={log.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div
                  className="flex items-start p-4 bg-gray-50 dark:bg-gray-700/50 cursor-pointer"
                  onClick={() => toggleLogDetails(log.id)}
                >
                  <div className="flex-shrink-0 mr-3">
                    {getLogStatusIcon(log.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {log.action}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(log.timestamp).toLocaleString('tr-TR')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {log.description}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Kullanıcı: {log.user}
                    </p>
                  </div>
                  {(log.request || log.response) && (
                    <div className="ml-3">
                      {expandedLogId === log.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>

                {expandedLogId === log.id && (log.request || log.response) && (
                  <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                    {log.request && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                          <Code className="w-4 h-4 mr-2" />
                          Request
                        </h5>
                        <pre className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg overflow-x-auto text-xs text-gray-600 dark:text-gray-300">
                          {log.request}
                        </pre>
                      </div>
                    )}
                    {log.response && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                          <Code className="w-4 h-4 mr-2" />
                          Response
                        </h5>
                        <pre className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg overflow-x-auto text-xs text-gray-600 dark:text-gray-300">
                          {log.response}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">İade İşlemi</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  İade Tutarı
                </label>
                <input
                  type="number"
                  max={transaction.remainingAmount}
                  step="0.01"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Maksimum iade tutarı: {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: transaction.currency
                  }).format(transaction.remainingAmount)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  İade Açıklaması
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    // Handle refund logic
                    setShowRefundModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
                >
                  İade Et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Capture Modal */}
      {showCaptureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Son Provizyon</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Provizyon Tutarı
                </label>
                <input
                  type="number"
                  max={transaction.remainingAmount}
                  step="0.01"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Maksimum tutar: {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: transaction.currency
                  }).format(transaction.remainingAmount)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Açıklama
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCaptureModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    // Handle capture logic
                    setShowCaptureModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
                >
                  Onayla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">İşlem Düzenle</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Not Ekle
                </label>
                <textarea
                  rows={4}
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="İşlem hakkında not ekleyin..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    // Handle edit logic
                    console.log('Saving note:', editNote);
                    setShowEditModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionDetails;