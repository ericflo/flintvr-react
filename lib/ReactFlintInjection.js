import ReactInjection from 'react/lib/ReactInjection';
import ReactComponentEnvironment from 'react/lib/ReactComponentEnvironment';
import ReactFlintReconcileTransaction from './ReactFlintReconcileTransaction';
import ReactFlintComponent from './ReactFlintComponent';

export default function inject() {

  ReactInjection.NativeComponent.injectGenericComponentClass(
    ReactFlintComponent
  );

  ReactInjection.Updates.injectReconcileTransaction(
    ReactFlintReconcileTransaction
  );

  ReactInjection.EmptyComponent.injectEmptyComponent('element');

  // NOTE: we're monkeypatching ReactComponentEnvironment because
  // ReactInjection.Component.injectEnvironment() currently throws,
  // as it's already injected by ReactDOM for backward compat in 0.14 betas.
  // Read more: https://github.com/Yomguithereal/react-blessed/issues/5
  ReactComponentEnvironment.processChildrenUpdates = function () {};
  ReactComponentEnvironment.replaceNodeWithMarkupByID = function () {};
}