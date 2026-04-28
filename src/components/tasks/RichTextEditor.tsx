import { useRef, useState } from 'react';
import { Bold, Italic, Underline, List, ListChecks, Code2, Quote, Link2, Heading2, Heading3, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  initialValue?: string;
}

const toolClass = 'h-9 w-9 rounded-xl border border-white/10 bg-[#1D1D24] text-[#B3B3BA] hover:bg-[#252530] hover:text-white transition-colors';

export default function RichTextEditor({ initialValue }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isDropActive, setIsDropActive] = useState(false);
  const [files, setFiles] = useState<string[]>([]);

  const run = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const onDropFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setFiles((prev) => [...prev, ...Array.from(incoming).map((f) => `${f.name} (${Math.round(f.size / 1024)} KB)`)]);
    setIsDropActive(false);
  };

  return (
    <div className="ds-surface overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 p-3">
        <button type="button" className={toolClass} onClick={() => run('bold')}><Bold className="h-4 w-4" /></button>
        <button type="button" className={toolClass} onClick={() => run('italic')}><Italic className="h-4 w-4" /></button>
        <button type="button" className={toolClass} onClick={() => run('underline')}><Underline className="h-4 w-4" /></button>
        <button type="button" className={toolClass} onClick={() => run('formatBlock', 'h2')}><Heading2 className="h-4 w-4" /></button>
        <button type="button" className={toolClass} onClick={() => run('formatBlock', 'h3')}><Heading3 className="h-4 w-4" /></button>
        <button type="button" className={toolClass} onClick={() => run('insertUnorderedList')}><List className="h-4 w-4" /></button>
        <button type="button" className={toolClass} onClick={() => run('insertOrderedList')}><ListChecks className="h-4 w-4" /></button>
        <button type="button" className={toolClass} onClick={() => run('insertHTML', '<ul><li><input type="checkbox"/> Чек-пункт</li></ul>')}><ListChecks className="h-4 w-4" /></button>
        <button type="button" className={toolClass} onClick={() => run('formatBlock', 'blockquote')}><Quote className="h-4 w-4" /></button>
        <button type="button" className={toolClass} onClick={() => run('formatBlock', 'pre')}><Code2 className="h-4 w-4" /></button>
        <button type="button" className={toolClass} onClick={() => run('createLink', window.prompt('Введите URL') || '')}><Link2 className="h-4 w-4" /></button>
        <label className={`${toolClass} flex cursor-pointer items-center justify-center`}>
          <Paperclip className="h-4 w-4" />
          <input type="file" multiple className="hidden" onChange={(e) => onDropFiles(e.target.files)} />
        </label>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="min-h-[260px] p-4 text-sm leading-7 outline-none"
        dangerouslySetInnerHTML={{ __html: initialValue || '<h3>Описание задачи</h3><p>Опишите цель и контекст. Используйте <strong>форматирование</strong>, списки и ссылки.</p><ul><li>Первый пункт</li><li>Второй пункт</li></ul>' }}
        onDragOver={(e) => { e.preventDefault(); setIsDropActive(true); }}
        onDragLeave={() => setIsDropActive(false)}
        onDrop={(e) => { e.preventDefault(); onDropFiles(e.dataTransfer.files); }}
      />

      {(isDropActive || files.length > 0) && (
        <div className="border-t border-white/10 p-3">
          <div className={`rounded-xl border border-dashed p-3 text-xs ${isDropActive ? 'border-[#F4511E]/60 bg-[#F4511E]/10 text-[#FF7A4D]' : 'border-white/15 bg-black/20 text-[#B3B3BA]'}`}>
            {isDropActive ? 'Отпустите файлы для прикрепления' : 'Файлы в задаче'}
            {files.length > 0 && <div className="mt-2 space-y-1">{files.map((file) => <div key={file}>• {file}</div>)}</div>}
          </div>
        </div>
      )}

      <div className="flex items-center justify-end p-3 pt-0">
        <Button size="sm">Сохранить описание</Button>
      </div>
    </div>
  );
}
