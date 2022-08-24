import EditorFile from './editorFile';

/**
 * 
 * @param {import('./editorFile').FileOptions[]} files 
 * @param {(count: number)=>void} callback
 */
export default async function openFiles(files) {
  const promises = [];
  let rendered = false;

  recursiveOpenFile(files);

  /**
   * 
   * @param {Array} files 
   */
  async function recursiveOpenFile(files) {
    const file = files.shift();
    if (!file) return;

    await openFile(file);
    if (files.length) {
      if (files.length === 1 && !rendered) {
        files[0].render = true;
      }
      recursiveOpenFile(files);
    }
  }

  async function openFile(file) {
    const { type, filename, render = false } = file;

    const options = {
      ...file,
      render,
      emitUpdate: false,
    };

    if (!rendered) rendered = render;

    if (type === 'git') {
      const record = await gitRecord.get(file.sha);
      if (record) {
        if (!options.text) options.text = record.data;
        options.record = record;
      }
    } else if (type === 'gist') {
      const gist = gistRecord.get(file.recordid, file.isNew);
      if (gist) {
        const gistFile = gist.files[filename];
        if (!options.text) options.text = gistFile.content;
        options.record = gist;
      }
    }

    new EditorFile(filename, options);
  }

  const res = await Promise.allSettled(promises);
  const failed = res.filter(r => r.status === 'rejected');
  const success = res.filter(r => r.status === 'fulfilled');
  return {
    failed,
    success,
  }
}