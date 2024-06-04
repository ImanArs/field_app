import React from 'react'
import cls from './styles.module.scss'
import classNames from 'classnames'

interface ModalProps {
  className?: string
  isOpen: boolean
  closeModal: () => void
  children: React.ReactNode | React.ReactNode[]
  title: string
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Modal = (props: ModalProps) => {
  const { isOpen, closeModal, children, title, className, onClick } = props
  return (
    <div>
    {isOpen && (
      <div className={cls.modal}>
        <div className={classNames(cls.modalContent, className)} onClick={onClick}>
          <div className={cls.title}>
          <h2>{title}</h2>
          <button className={cls.closeModal} onClick={closeModal}>
            <img src="https://logowik.com/content/uploads/images/close1437.jpg" alt="" />
          </button>
          </div>
          {children}
        </div>
      </div>
      )}
    </div>
  )
}

export default Modal