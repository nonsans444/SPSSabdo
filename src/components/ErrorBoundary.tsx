import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SPSS Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn(e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          dir="rtl"
          className="min-h-screen bg-[#FAF7F2] text-slate-900 flex items-center justify-center p-4 font-sans"
        >
          <div className="max-w-md w-full bg-white rounded-2xl p-6 shadow-xl border border-slate-200 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#006233] mx-auto flex items-center justify-center text-2xl font-bold">
              SPSS
            </div>

            <h1 className="text-xl font-bold text-slate-900">
              حدث خطأ أثناء تحميل التطبيق
            </h1>

            <p className="text-xs text-slate-600 leading-relaxed">
              يُرجى إعادة تحديث الصفحة أو مسح الذاكرة المؤقتة للبدء من جديد.
            </p>

            {this.state.error?.message && (
              <pre className="text-[11px] bg-slate-50 p-3 rounded-lg text-slate-500 overflow-x-auto text-start">
                {this.state.error.message}
              </pre>
            )}

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#006233] text-white font-bold text-xs hover:bg-[#00542c] transition-colors"
              >
                إعادة تحميل الصفحة
              </button>
              <button
                onClick={this.handleReset}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
              >
                إعادة ضبط التطبيق
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
