import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/auth/Login';
import OTP from './pages/auth/OTP';
import Dashboard from './pages/Dashboard';
import PaymentSystems from './pages/PaymentSystems';
import VirtualPOSManagement from './pages/payment-systems/VirtualPOSManagement';
import VirtualPOSPermissions from './pages/payment-systems/VirtualPOSPermissions';
import NewPOS from './pages/payment-systems/NewPOS';
import Users from './pages/Users';
import PaymentLinks from './pages/PaymentLinks';
import NewPaymentLink from './pages/NewPaymentLink';
import RecurringPayments from './pages/RecurringPayments';
import NewRecurringPayment from './pages/NewRecurringPayment';
import SplitPayments from './pages/SplitPayments';
import TransactionReports from './pages/reports/TransactionReports';
import TransactionDetails from './pages/reports/TransactionDetails';
import ActivityReports from './pages/reports/ActivityReports';
import Integration from './pages/Integration';
import ManualPOS from './pages/ManualPOS';
import CommissionManagement from './pages/CommissionManagement';
import CommissionSchemes from './pages/CommissionSchemes';
import CommissionSchemeForm from './pages/CommissionSchemeForm';
import CommissionSchemeDetails from './pages/CommissionSchemeDetails';
import CommissionRates from './pages/CommissionRates';
import RoutingSettings from './pages/settings/RoutingSettings';
import BinSettings from './pages/settings/BinSettings';
import NewBinRule from './pages/settings/NewBinRule';
import BinActions from './pages/settings/BinActions';
import NewBinAction from './pages/settings/NewBinAction';
import EditBinAction from './pages/settings/EditBinAction';

// Reconciliation Routes
import ManualUpload from './pages/reconciliation/ManualUpload';
import FTPSettings from './pages/reconciliation/FTPSettings';
import MatchedTransactions from './pages/reconciliation/MatchedTransactions';
import UnmatchedTransactions from './pages/reconciliation/UnmatchedTransactions';
import AllTransactions from './pages/reconciliation/AllTransactions';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, isAuthorized } = useAuth();
  
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/otp" replace />;
  }
  
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthorized } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (isAuthorized) {
    return <Navigate to="/otp" replace />;
  }
  
  return <>{children}</>;
}

function OTPRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthorized } = useAuth();
  
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/otp" element={<OTPRoute><OTP /></OTPRoute>} />
      
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      
      {/* Payment Systems Routes */}
      <Route path="/payment-systems" element={<PrivateRoute><PaymentSystems /></PrivateRoute>} />
      <Route path="/payment-systems/virtual-pos" element={<PrivateRoute><VirtualPOSManagement /></PrivateRoute>} />
      <Route path="/payment-systems/virtual-pos/permissions" element={<PrivateRoute><VirtualPOSPermissions /></PrivateRoute>} />
      <Route path="/payment-systems/virtual-pos/new" element={<PrivateRoute><NewPOS /></PrivateRoute>} />
      
      <Route path="/payment-links" element={<PrivateRoute><PaymentLinks /></PrivateRoute>} />
      <Route path="/payment-links/new" element={<PrivateRoute><NewPaymentLink /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
      <Route path="/manual-pos" element={<PrivateRoute><ManualPOS /></PrivateRoute>} />
      <Route path="/recurring-payments" element={<PrivateRoute><RecurringPayments /></PrivateRoute>} />
      <Route path="/recurring-payments/new" element={<PrivateRoute><NewRecurringPayment /></PrivateRoute>} />
      <Route path="/split-payments" element={<PrivateRoute><SplitPayments /></PrivateRoute>} />

      {/* Commission Management Routes */}
      <Route path="/commission-management" element={<PrivateRoute><CommissionManagement /></PrivateRoute>} />
      <Route path="/commission-management/:providerId/:posId" element={<PrivateRoute><CommissionSchemes /></PrivateRoute>} />
      <Route path="/commission-management/:providerId/:posId/new" element={<PrivateRoute><CommissionSchemeForm /></PrivateRoute>} />
      <Route path="/commission-management/:providerId/:posId/:schemeId" element={<PrivateRoute><CommissionSchemeDetails /></PrivateRoute>} />
      <Route path="/commission-management/:providerId/:posId/:schemeId/edit" element={<PrivateRoute><CommissionSchemeForm /></PrivateRoute>} />
      <Route path="/commission-management/:providerId/:posId/rates" element={<PrivateRoute><CommissionRates /></PrivateRoute>} />

      {/* Reconciliation Routes */}
      <Route path="/reconciliation">
        <Route path="upload/manual" element={<PrivateRoute><ManualUpload /></PrivateRoute>} />
        <Route path="upload/ftp" element={<PrivateRoute><FTPSettings /></PrivateRoute>} />
        <Route path="transactions/matched" element={<PrivateRoute><MatchedTransactions /></PrivateRoute>} />
        <Route path="transactions/unmatched" element={<PrivateRoute><UnmatchedTransactions /></PrivateRoute>} />
        <Route path="transactions/all" element={<PrivateRoute><AllTransactions /></PrivateRoute>} />
      </Route>
      
      <Route path="/reports/transactions" element={<PrivateRoute><TransactionReports /></PrivateRoute>} />
      <Route path="/reports/transactions/:id" element={<PrivateRoute><TransactionDetails /></PrivateRoute>} />
      <Route path="/reports/activities" element={<PrivateRoute><ActivityReports /></PrivateRoute>} />
      
      {/* Settings Routes */}
      <Route path="/settings">
        <Route path="routing" element={<PrivateRoute><RoutingSettings /></PrivateRoute>} />
        <Route path="bin" element={<PrivateRoute><BinSettings /></PrivateRoute>} />
        <Route path="bin/new" element={<PrivateRoute><NewBinRule /></PrivateRoute>} />
        <Route path="bin-actions" element={<PrivateRoute><BinActions /></PrivateRoute>} />
        <Route path="bin-actions/new" element={<PrivateRoute><NewBinAction /></PrivateRoute>} />
        <Route path="bin-actions/:id" element={<PrivateRoute><EditBinAction /></PrivateRoute>} />
      </Route>
      
      <Route path="/integration" element={<PrivateRoute><Integration /></PrivateRoute>} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;